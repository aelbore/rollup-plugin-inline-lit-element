import { symlinkDir, exec } from 'aria-build'

(async function() {
  await exec('npm run build')
  await symlinkDir('./dist', './node_modules/rollup-plugin-inline-lit-element')
})()