
import { join, dirname } from 'path'
import { build, clean, TSRollupConfig, terser, copyFile, minifyHTML } from 'aria-build'

import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

(async function() {
  const input = 'demo/counter/counter.ts'
  const file = 'dist/demo/counter/counter.js'

  const HTML_FILE = join(dirname(input), 'index.html')
  const HTML_FILE_OUTPUT = join(dirname(file), 'index.html')

  const options: TSRollupConfig = {
    input,
    plugins: [
      minifyHTML(),
      inlineLitElement(),
      terser()
    ],
    output: {
      file,
      format: 'es'
    }
  }

  await clean('dist/demo')
  await build(options)
  await copyFile(HTML_FILE, HTML_FILE_OUTPUT)
})()