import * as ts from 'typescript'

const LIT_ELEMENT_MODULE_SPECIFIER = 'lit-element'
const CSS_IMPORT_SPECIFIER = 'css'

function cssImportSpecifierExists(node: ts.ImportDeclaration) {
  const namedBindings = node.importClause.namedBindings as ts.NamedImports

  return namedBindings.elements.find(element => {
    return element.getText().includes(CSS_IMPORT_SPECIFIER) 
  })
}

function updateCssImportSpecfier(node: ts.ImportDeclaration, specifier: ts.ImportSpecifier) {
  const namedBindings = node.importClause.namedBindings as ts.NamedImports

  if (!cssImportSpecifierExists(node)) {
    return ts.updateImportDeclaration(
      node, 
      node.decorators, 
      node.modifiers,
      ts.updateImportClause(
        node.importClause,
        node.importClause.name, 
        ts.updateNamedImports(
          namedBindings, 
          [ ...namedBindings.elements, specifier ]
        )
      ), 
      node.moduleSpecifier)
  }

  return node
}

export function cssImportDeclation() {
  return context => {
    const visitor = (node) => {
      if (ts.isImportDeclaration(node)) {
        const specifier = ts.createImportSpecifier(void 0, ts.createIdentifier(CSS_IMPORT_SPECIFIER))
        if (node.getText().includes(LIT_ELEMENT_MODULE_SPECIFIER)) {
          return updateCssImportSpecfier(node, specifier)
        }
        return node
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor
  }
}