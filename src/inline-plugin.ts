import * as ts from 'typescript'
import * as path from 'path'

import MagicString from 'magic-string'

import { inlineCSS } from './inline-css-transformer'
import { inlineSass } from './inline-sass-transformer'
import { cssImportDeclation } from './css-import-declaration'

const resolveId = importee => { 
  if (importee.includes('.css') || importee.includes('.scss')) return importee; 
  return null 
}

const loadById = id => { 
  if (id.includes('.css') || id.includes('.scss')) return '';  
  return null 
}

const transfileModule = (filePath: string, code: string, transformers: any[]) => {
  const { outputText, sourceMapText } = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ES2015, 
      target: ts.ScriptTarget.ES2018,
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      strictNullChecks: false,
      sourceMap: true,
      newLine: ts.NewLineKind.LineFeed
    },
    transformers: { 
      before: [
        inlineSass(filePath),
        ...transformers,
        cssImportDeclation()
      ]
    }
  }); 
  return { code: outputText, map: sourceMapText }
}

export function inlineLitElement({ transformers }) {
  return {
    name: 'inlineLitElement',    
    resolveId: resolveId,
    load: loadById,
    transform (code, id) {  
      const magicString = new MagicString(code);
      if (!id.includes(path.join(path.resolve(), 'node_modules'))) {
        return transfileModule(id, magicString.toString(), transformers || [])
      }
      return { 
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true })
      }
    }
  }
}