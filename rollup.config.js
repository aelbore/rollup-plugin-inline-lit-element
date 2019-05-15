
import { terser, nodeResolve, minifyHTML, onwarn } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

const input = 'demo/hello-world/hello-world.js'
const file = 'dist/demo/hello-world/hello-world.js'

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
    minifyHTML(),
    inlineLitElement(),
    nodeResolve(),
    terser()
  ],
  onwarn,
  output: {
    sourcemap: true,
    globals: {},
    file,
    format: 'es'
  }
}