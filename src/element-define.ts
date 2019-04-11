import * as ts from 'typescript'

function createDefineExpressionStatement(tagName, className) {
  const propertyAccess = ts.createPropertyAccess(
    ts.createIdentifier('customElements'), 
    ts.createIdentifier('define')
  )
  const expressionCall = ts.createCall(propertyAccess, undefined, [
    ts.createStringLiteral(tagName.replace(/'/gm, '')),
    ts.createIdentifier(className)
  ])

  return ts.createExpressionStatement(expressionCall)
}

function createCustomElementDefine(statement) {
  let callDefineStatement = {}

  if (statement.decorators) {
    const decorator = statement.decorators.find(decorator => {
      return ts.isCallExpression(decorator.expression) 
        && (decorator.expression as ts.CallExpression)
            .expression.getText().includes('customElement')
    })
    if (decorator) {
      const callExpression = decorator.expression as ts.CallExpression
      const tagName = callExpression.arguments[0].getText()
      callDefineStatement = createDefineExpressionStatement(tagName, statement.name.text)
    }
  }

  return callDefineStatement
}

export function customElementDefine() {
  return context => {
    const visitor = (node) => {
      if (Array.isArray(node.statements)) {     
        let callDefineStatement = {}
        node.statements = node.statements.map(statement => {
          if (ts.isClassDeclaration(statement) && statement.decorators) {
            callDefineStatement = createCustomElementDefine(statement)
            const decorators = statement.decorators.filter(decorator => {
              return (!(ts.isCallExpression(decorator.expression) 
                && (decorator.expression as ts.CallExpression)
                    .expression.getText().includes('customElement')))
            })
            /// @ts-ignore
            statement.decorators = [ ...decorators ]
          }
          return statement
        })
        node.statements = [ 
          ...node.statements, callDefineStatement
        ]
      }
      return ts.visitEachChild(node, (child) => visitor(child), context);
    }
    return visitor
  }
}