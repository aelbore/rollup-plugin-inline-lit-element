import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve'

import { terser } from 'rollup-plugin-terser'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

const INPUT_FILE = 'demo/decorators/hello-world/hello-world.ts'
const OUTPUT_FILE = 'dist/demo/decorators/hello-world/hello-world.js'

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
  onwarn (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.log("Rollup warning: ", warning.message);
  },
  output: {
    sourcemap: true,
    globals: {},
    file: OUTPUT_FILE,
    format: 'esm'
  }
}