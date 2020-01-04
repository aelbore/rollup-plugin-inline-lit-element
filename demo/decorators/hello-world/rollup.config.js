import { onwarn, copy } from 'aria-build'
import { plugins } from '../../../rollup.plugins'

const input = 'demo/decorators/hello-world/hello-world.ts'
const file = 'dist/demo/decorators/hello-world/hello-world.js'

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
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