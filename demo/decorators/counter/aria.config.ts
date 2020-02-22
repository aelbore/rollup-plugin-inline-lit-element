import { minifyHTML, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

const scssVarLike = require('postcss-simple-vars')

export default {
  plugins: [ 
    inlineLitElement({
      preprocessor: 'postcss',
      plugins: [ scssVarLike() ]
    }), 
    minifyHTML(),
    copy({
      targets: [
        { src: './demo/hello-world/index.html', dest: './dist/demo/hello-world' }
      ]
    })
  ]
}