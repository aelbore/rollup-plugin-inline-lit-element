import * as path from 'path'

import { rollup } from 'rollup'
import { clean } from 'aria-fs'

import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser'

const { inlineLitElement } = require('../dist/inline-plugin')

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve')


const INPUT_FILE = 'demo/counter/counter.ts'
const OUTPUT_FILE = 'dist/demo/counter/counter.js'

function rollupBuild({ inputOptions, outputOptions }) {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: INPUT_FILE,
    external: [],
    plugins: [
      minifyHTML(),
      inlineLitElement(),
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
        exclude: [ 'demo' ],
        check: false,
        cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
        useTsconfigDeclarationDir: true
      }),    
      resolve(),
      terser()
    ],
    onwarn (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') { return; }
      console.log("Rollup warning: ", warning.message);
    }
  },
  outputOptions: {
    sourcemap: true,
    globals: {},
    file: OUTPUT_FILE,
    format: 'esm'
  }
}

clean('dist/demo')
  .then(() => rollupBuild(rollupConfig))
  .catch(error => console.log(error))
