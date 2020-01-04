
import { terser, minifyHTML, nodeResolve } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

export const plugins = [
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
  nodeResolve()
]