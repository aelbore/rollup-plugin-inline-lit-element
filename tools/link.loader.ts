import { symlinkDir } from 'aria-build'

(async function() {
  await symlinkDir('./dist', './node_modules/rollup-plugin-inline-lit-element')
})()