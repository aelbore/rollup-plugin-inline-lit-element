import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve'

import { terser } from 'rollup-plugin-terser'
const { inlineLitElement } = require('./dist/inline-plugin')

export default {
  treeshake: true,
  input: 'demo/hello-world/hello-world.js',
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
    file: 'dist/hello-world/hello-world.js',
    format: 'esm'
  }
}