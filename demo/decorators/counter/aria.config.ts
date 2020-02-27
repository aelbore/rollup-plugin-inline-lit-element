import { minifyHTML, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

const scssVarLike = require('postcss-simple-vars')

export default {
  plugins: {
    before: [
      inlineLitElement({
        preprocessor: 'postcss',
        plugins: [ scssVarLike() ]
      }), 
      minifyHTML()
    ],
    after: [
      copy({
        targets: [
          { src: './demo/decorators/counter/index.html', dest: './dist/demo/decorators/counter' }
        ]
      })
    ]
  }
}