import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve'

import { terser } from 'rollup-plugin-terser'
const { inlineLitElement } = require('./dist/inline-plugin')

const INPUT_FILE = 'demo/decorators/hello-world/hello-world.ts'
const OUTPUT_FILE = 'dist/hello-world/hello-world.js'

export default {
  treeshake: true,
  input: INPUT_FILE,
  external: [],
  plugins: [
    minifyHTML(),
    inlineLitElement(),
    resolve(),
    terser()
  ],
  output: {
    sourcemap: true,
    globals: {},
    file: OUTPUT_FILE,
    format: 'esm'
  }
}