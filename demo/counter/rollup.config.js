import { onwarn, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'
import { plugins } from '../../tools/rollup.plugins'

const scssVarLike = require('postcss-simple-vars')

const input = 'demo/counter/counter.ts'
const file = 'dist/demo/counter/counter.js'

const Plugins = [ ...plugins ]
Plugins.shift()

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
    inlineLitElement({
      preprocessor: 'postcss',
      plugins: [ scssVarLike() ]
    }),
    ...Plugins,
    copy({ 
      targets: [
        { src: './demo/counter/index.html', dest: './dist/demo/counter' }
      ] 
    })
  ],
  onwarn,
  output: {
    sourcemap: true,
    file,
    format: 'es'
  }
}