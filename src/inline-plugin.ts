import * as path from 'path'

import { 
  transform, 
  SassPreprocessor, 
  PostCssPreprocessor,
  MagicString
} from 'lit-element-transpiler'

const resolveId = (importee: string) => { 
  if (importee.includes('.css') || importee.includes('.scss')) return importee; 
  return null 
}

const loadById = (id: string) => { 
  if (id.includes('.css') || id.includes('.scss')) return '';  
  return null 
}

const transformCode = (code: string) => {
  const magicString = new MagicString(code)
  return { 
    code: magicString.toString(), 
    map: magicString.generateMap({ hires: true })  
  }
}

export function inlineLitElement(options?: SassPreprocessor | PostCssPreprocessor) {
  return {
    name: 'inlineLitElement',    
    resolveId: resolveId,
    load: loadById,
    transform(code: string, id: string) {  
      if (!id.includes(path.join(path.resolve(), 'node_modules'))) {
        return transform(id, code, { cssOptions: options })
      }
      return transformCode(code)
    }
  }
}