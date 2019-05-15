
import { resolve } from 'path'
import { symlinkDir, exist } from 'aria-build'

(async function() {
  const OUTPUT_FOLDER = resolve('dist')
  const NODE_MODULES_FOLDER = resolve('node_modules/rollup-plugin-inline-lit-element')

  if (await exist(OUTPUT_FOLDER)) {
    await symlinkDir(OUTPUT_FOLDER, NODE_MODULES_FOLDER)
  }
})()