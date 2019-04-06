import * as ts from 'typescript'

function createArrayLiteralStyles(cssStyles) {
  return ts.createArrayLiteral(
    cssStyles.map(cssStyle => createCSSTagTemplate(cssStyle))
  )
}

function createCSSTagTemplate(template) {
  return ts.createTaggedTemplate(
    ts.createIdentifier('css'), 
    ts.createNoSubstitutionTemplateLiteral(template)
  )
}

function createReturnStatement(cssStyles) {
  return cssStyles.length > 1
    ? ts.createReturn(createArrayLiteralStyles(cssStyles))
    : ts.createReturn(createCSSTagTemplate(cssStyles[0]))
}

function createGetAccessorStaticStyle(css) {
  return ts.createGetAccessor(undefined, 
    [ ts.createModifier(ts.SyntaxKind.StaticKeyword) ], 
    ts.createIdentifier('styles'), 
    [], 
    undefined, 
    ts.createBlock([ createReturnStatement(css) ])
  )
}

function updateGetAccessorStaticStyle(members, node, css) {
  const expression = (node.body.statements[0] as ts.ReturnStatement).expression
  
  members = members.filter(member => (!(member.getText().includes('styles'))))

  const returnBlock = ts.createReturn(ts.createArrayLiteral([ 
    expression, ...css.map(cssStyle => createCSSTagTemplate(cssStyle)) 
  ]))

  return [
    ts.createGetAccessor(node.decorators, 
      [ ts.createModifier(ts.SyntaxKind.StaticKeyword) ], 
      ts.createIdentifier('styles'), 
      [], 
      undefined, 
      ts.updateBlock(node.body, [ returnBlock ])
    ),
    ...members
  ]
}

function createStaticGetAccessor(statement, styles) {
  const styleStaticGet = statement.members.find(member => {
    return ts.isGetAccessor(member) && member.getText().includes('styles')
  })

  if (styleStaticGet) {
    return updateGetAccessorStaticStyle(statement.members, styleStaticGet, styles)
  } 

  return [ ...statement.members, createGetAccessorStaticStyle(styles) ]
}

export function getStatements(statements, styles) {
  return statements.map(statement => {
    if (ts.isClassDeclaration(statement)) {
      if (styles && styles.length > 0) {
        /// @ts-ignore
        statement.members = createStaticGetAccessor(statement, styles)
      }
    }
    return statement
  }) 
}