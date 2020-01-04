import { onwarn, copy } from 'aria-build'
import { plugins } from '../../../rollup.plugins'

const input = 'demo/decorators/counter/counter.ts'
const file = 'dist/demo/decorators/counter/counter.js'

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
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