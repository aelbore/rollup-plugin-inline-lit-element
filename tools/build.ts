import * as path from 'path'
import * as fs from 'fs'
import * as util from 'util'

import { rollup } from 'rollup'
import { clean } from 'aria-fs'

const writeFile = util.promisify(fs.writeFile)

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve')

const INPUT_FILE = 'src/inline-plugin.ts'
const OUTPUT_FILE = 'dist/inline-plugin.js'

function rollupBuild({ inputOptions, outputOptions }) {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

async function copyPackageFile() {
  const FILE_NAME = 'package.json';
  const pkg = require(`../${FILE_NAME}`);
  delete pkg.scripts;
  delete pkg.devDependencies;
  return writeFile(`dist/${FILE_NAME}`, JSON.stringify(pkg, null, 2))
}

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: INPUT_FILE,
    external: [
      'path', 'typescript', 'fs', 'magic-string'
    ],
    plugins: [
      typescript2({
        tsconfigDefaults: { 
          compilerOptions: { 
            target: 'es2015', 
            module: 'esNext', 
            moduleResolution: 'node',
            declaration: true,
            lib: [ "dom", "es2015", "es2017" ]
          },
          include: [ INPUT_FILE ]
        },
        check: false,
        cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
        useTsconfigDeclarationDir: false
      }),    
      resolve()
    ],
    onwarn (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') { return; }
      console.log("Rollup warning: ", warning.message);
    }
  },
  outputOptions: {
    sourcemap: false,
    file: OUTPUT_FILE,
    format: 'cjs'
  }
}

clean('dist')
  .then(() => rollupBuild(rollupConfig))
  .then(() => copyPackageFile())