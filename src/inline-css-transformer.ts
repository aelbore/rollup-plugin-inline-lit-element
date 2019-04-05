import * as ts from 'typescript'
import * as path from 'path'
import * as fs from 'fs'

import { getStatements } from './common'

function getStyles(tsFilePath, statements) {
  const cssStatements = statements.filter(statement => {
    return ts.isImportDeclaration(statement) 
      && (statement.moduleSpecifier.getText().includes('.css') 
            || statement.moduleSpecifier.getText().includes('.scss')) 
  })
  if (cssStatements) {
    return cssStatements
      .map(statement => {
        const cssRelativePath = statement.moduleSpecifier.getText().replace(/'/g, '')
        const cssFullPath = path.resolve(path.dirname(tsFilePath), cssRelativePath)
        return fs.readFileSync(cssFullPath, 'utf8')
      })   
  }
  return []
}

export function inlineCSS(tsFilePath: string) {
  return context => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        node.statements = getStatements(node.statements, getStyles(tsFilePath, node.statements))
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor
  }
}