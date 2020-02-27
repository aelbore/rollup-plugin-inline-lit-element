import { unlinkDir } from 'aria-build'

(async function(){
  await unlinkDir('./node_modules/lit-element-transpiler')
  await unlinkDir('./node_modules')
})()