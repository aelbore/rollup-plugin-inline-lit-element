import * as path from 'path'
import MagicString from 'magic-string'

import { transpile, inlineStyles, customElementDefine, cssImportDeclation, propsDecorators } from 'lit-element-transpiler'

const resolveId = importee => { 
  if (importee.includes('.css') || importee.includes('.scss')) return importee; 
  return null 
}

const loadById = id => { 
  if (id.includes('.css') || id.includes('.scss')) return '';  
  return null 
}

export function inlineLitElement() {
  return {
    name: 'inlineLitElement',    
    resolveId: resolveId,
    load: loadById,
    transform (code, id) {  
      const magicString = new MagicString(code);
      if (!id.includes(path.join(path.resolve(), 'node_modules'))) {
        return transpile(id, magicString.toString(), {
          transformers: {
            before: [
              propsDecorators(),
              customElementDefine(),
              inlineStyles(id),
              cssImportDeclation()
            ]
          }
        })
      }
      return { 
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      }
    }
  }
}