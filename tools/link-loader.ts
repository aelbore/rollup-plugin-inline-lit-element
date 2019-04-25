import * as fs from 'fs'
import * as path from 'path'

import { symlinkDir } from 'aria-fs'

const OUTPUT_FOLDER = path.resolve('dist')
const NODE_MODULES_FOLDER = path.resolve('node_modules/rollup-plugin-inline-lit-element')

Promise.resolve()
  .then(() => {
    return (fs.existsSync(OUTPUT_FOLDER))
      ? symlinkDir(OUTPUT_FOLDER, NODE_MODULES_FOLDER)
      : Promise.resolve()
  })