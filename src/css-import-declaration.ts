import * as ts from 'typescript'

const LIT_ELEMENT_MODULE_SPECIFIER = 'lit-element'
const CSS_IMPORT_SPECIFIER = 'css'

function createImportDeclaration(node: ts.ImportDeclaration, moduleSpecifier: ts.Expression, specifiers: ReadonlyArray<ts.ImportSpecifier>) {
  return ts.createImportDeclaration(
    node.decorators,
    node.modifiers,
    ts.createImportClause(void 0, ts.createNamedImports(specifiers)),
    moduleSpecifier) 
}

function updateCssImportSpecfier(node: ts.ImportDeclaration, specifier: ts.ImportSpecifier) {
  const { namedBindings } = node.importClause
  const { elements } = namedBindings as ts.NamedImports

  const specifiers: Array<ts.ImportSpecifier> = [ ...elements ]

  const hasCssImportSpecifier = elements.find(element => element.getText().includes(CSS_IMPORT_SPECIFIER))
  if (!hasCssImportSpecifier) {
    specifiers.push(specifier)
  }
  
  return createImportDeclaration(node, node.moduleSpecifier, specifiers)  
}

export function cssImportDeclation() {
  return context => {
    const visitor = (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) {
        const specifier = ts.createImportSpecifier(void 0, ts.createIdentifier(CSS_IMPORT_SPECIFIER))
        if (node.getText().includes(LIT_ELEMENT_MODULE_SPECIFIER)) {
          return updateCssImportSpecfier(node, specifier)
        }

        return createImportDeclaration(node, 
          ts.createStringLiteral(LIT_ELEMENT_MODULE_SPECIFIER), 
          [ specifier ]
        )     
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor
  }
}