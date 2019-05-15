
import { sep } from 'path'
import { copyFile } from 'aria-build'

const files = [
  'demo/counter/index.html',
  'demo/decorators/counter/index.html',
  'demo/decorators/hello-world/index.html',
  'demo/hello-world/index.html'
]

Promise.all(files.map(file => {
  const destPath = file.replace('demo', 'dist' + sep + 'demo')
  return copyFile(file, destPath)
}))