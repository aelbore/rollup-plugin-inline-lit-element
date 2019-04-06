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

function compileStyle(statement, cssFullPath) {
  return statement.moduleSpecifier.getText().includes('.scss')
    ? buildSass(cssFullPath, require('node-sass'))
    : fs.readFileSync(cssFullPath, 'utf8') 
}

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
        return compileStyle(statement, cssFullPath)
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