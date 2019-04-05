import * as ts from 'typescript'
import * as path from 'path'
import * as fs from 'fs'

import { getStatements } from './common'

function buildSass(srcFile: string, sass: any) {
  const options = {
    data: fs.readFileSync(srcFile, 'utf8'),
    file: srcFile,
    outputStyle: 'compressed'
  }
  return sass.renderSync(options).css.toString() 
}

function getStyles(tsFilePath, statements) {
  const cssStatements = statements.filter(statement => {
    return ts.isImportDeclaration(statement) 
      && statement.moduleSpecifier.getText().includes('.scss')
  })
  if (cssStatements) {
    return cssStatements
      .map(statement => {
        const cssRelativePath = statement.moduleSpecifier.getText().replace(/'/g, '')
        const cssFullPath = path.resolve(path.dirname(tsFilePath), cssRelativePath)
        return buildSass(cssFullPath, require('node-sass'))
      })   
  }
  return []
}

function inlineSass(tsFilePath) {
  return context => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {
        if (Array.isArray(node.statements)) {
          const styles = getStyles(tsFilePath, node.statements)
          console.log(styles)
          node.statements = getStatements(node.statements, styles)
        }
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor    
  }
}

export { inlineSass }