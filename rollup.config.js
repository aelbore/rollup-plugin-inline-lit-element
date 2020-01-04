
import { onwarn, copy } from 'aria-build'
import { plugins } from './rollup.plugins'

const input = 'demo/hello-world/hello-world.js'
const file = 'dist/demo/hello-world/hello-world.js'

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
    ...plugins,
    copy({ 
      targets: [
        { src: './demo/hello-world/index.html', dest: './dist/demo/hello-world' }
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