import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'

const copyFile = util.promisify(fs.copyFile)

const files = [
  'demo/counter/index.html',
  'demo/decorators/counter/index.html',
  'demo/decorators/hello-world/index.html',
  'demo/hello-world/index.html'
]

Promise.all(files.map(file => {
  const destPath = file.replace('demo', 'dist' + path.sep + 'demo')
  return copyFile(file, destPath)
}))