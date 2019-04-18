(async function(){
  const path = require('path')
  const { symlinkDir } = require('aria-fs')

  const NODE_MODULES_DEST = path.resolve('transpiler/node_modules')

  await symlinkDir(path.resolve('node_modules'), NODE_MODULES_DEST)
  await symlinkDir(path.resolve('transpiler/dist'), path.resolve('node_modules/lit-element-transpiler'))
})()