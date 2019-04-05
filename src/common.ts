import * as ts from 'typescript'

function createGetAssesorStaticStyle(css: string) {
  const createCSSTagTemplate = (template: string) => {
    return ts.createTaggedTemplate(
      ts.createIdentifier('css'), 
      ts.createNoSubstitutionTemplateLiteral(template)
    )
  }

  return ts.createGetAccessor(undefined, 
    [ ts.createModifier(ts.SyntaxKind.StaticKeyword) ], 
    ts.createIdentifier('styles'), 
    [], 
    undefined, 
    ts.createBlock(
      [ ts.createReturn(createCSSTagTemplate(css[0])) ]
    )
  )
}

function createStaticGetAccessor(statement, styles) {
  const members = [ ...statement.members ]
  const styleStaticGet = statement.members.find(member => {
    return ts.isGetAccessor(member) && member.getText().includes('styles')
  })
  
  if (styleStaticGet) {

  } else {
    members.push(createGetAssesorStaticStyle(styles))
  }

  return members
}

export function getStatements(statements, styles) {
  return statements.map(statement => {
    if (ts.isClassDeclaration(statement)) {
      if (styles && styles.length > 0) {
        /// @ts-ignore
        statement.members = [ ...createStaticGetAccessor(statement, styles) ]
      }
    }
    return statement
  }) 
}