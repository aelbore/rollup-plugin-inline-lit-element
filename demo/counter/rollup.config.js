import { onwarn, copy } from 'aria-build'
import { plugins } from '../../rollup.plugins'

const input = 'demo/counter/counter.ts'
const file = 'dist/demo/counter/counter.js'

export default {
  treeshake: true,
  input,
  external: [],
  plugins: [
    ...plugins,
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