import { onwarn, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'
import { plugins } from '../../../tools/rollup.plugins'

const input = 'demo/decorators/hello-world/hello-world.ts'
const file = 'dist/demo/decorators/hello-world/hello-world.js'

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
        { src: './demo/decorators/hello-world/index.html', dest: './dist/demo/decorators/hello-world' }
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