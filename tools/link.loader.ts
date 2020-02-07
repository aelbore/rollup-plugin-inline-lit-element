import { symlinkDir, exec } from 'aria-build'

(async function() {
  await exec('npm --prefix ./transpiler run build')
  await Promise.all([
    symlinkDir('./dist', './node_modules/rollup-plugin-inline-lit-element'),
    symlinkDir('./transpiler/dist', './node_modules/lit-element-transpiler')
  ])
})()