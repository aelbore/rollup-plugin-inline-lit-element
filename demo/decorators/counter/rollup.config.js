import { onwarn, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'
import { plugins } from '../../../tools/rollup.plugins'

const input = 'demo/decorators/counter/counter.ts'
const file = 'dist/demo/decorators/counter/counter.js'

const Plugins = [ ...plugins ]
Plugins.shift()

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
    inlineLitElement(),
    ...plugins,
    copy({ 
      targets: [
        { src: './demo/decorators/counter/index.html', dest: './dist/demo/decorators/counter' }
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