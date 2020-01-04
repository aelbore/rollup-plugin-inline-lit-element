import { terser, minifyHTML, copy } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

export default {
  plugins: [
    inlineLitElement(), 
    minifyHTML(), 
    terser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        }
      },
      output: {
        comments: false
      }
    }),
    copy({ 
      targets: [
        { src: './demo/counter/index.html', dest: './dist/demo/counter' }
      ] 
    })
  ]
}