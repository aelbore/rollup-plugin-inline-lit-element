
import { terser, minifyHTML, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

export default {
  plugins: {
    before: [ inlineLitElement(), minifyHTML(), terser() ],
    after: [ 
      copy({ 
        targets: [
          { src: './demo/counter/index.html', dest: './dist/demo/counter' }
        ] 
      })
    ]
  }
}