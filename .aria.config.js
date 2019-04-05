const { inlineLitElement } = require('./dist/inline-plugin')

module.exports = {
  rollupPlugins: [ 
    inlineLitElement() 
  ]
}