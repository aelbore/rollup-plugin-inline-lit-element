
import { clean, TSRollupConfig, build, copyReadmeFile, copyPackageFile } from 'aria-build'

(async function() {
  const pkg = require('../package.json')

  const options: TSRollupConfig = {
    input: 'src/inline-plugin.ts',
    external: [
      'typescript', 
      ...Object.keys(pkg.dependencies)
    ],
    output: {
      file: 'dist/inline-plugin.js',
      format: 'cjs'
    },
    tsconfig: {
      compilerOptions: {
        declaration: true
      }
    }
  }

  const pkgOptions = {
    main: 'inline-plugin.js',
    typings: 'inline-plugin.d.ts',
    module: 'inline-plugin.js'
  }

  await clean('dist')
  await build(options)
  await Promise.all([ copyReadmeFile(), copyPackageFile(pkgOptions) ])
})()