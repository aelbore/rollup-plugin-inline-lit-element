import { minifyHTML, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

export default {
  plugins: [ 
    inlineLitElement(), 
    minifyHTML(),
    copy({
      targets: [
        { src: './demo/hello-world/index.html', dest: './dist/demo/hello-world' }
      ]
    })
  ]
}