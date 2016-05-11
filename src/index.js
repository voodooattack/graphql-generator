var GraphQLLanguage = require('graphql/language')
var generate = require('./generate')

var generator = module.exports = {}

generator.define = function (schema, resolves, deps) {
    var ast = GraphQLLanguage.parse(schema, {noLocation: true})
    return generate(ast, resolves, deps)
}

// utility to mix multiple type definition into deps
var DEFINITION_TYPES = [
    'objectTypes',
    'interfaceTypes',
    'inputTypes',
    'unionTypes',
    'scalarTypes',
    'enumTypes',
    'lazyDependencies'
]
generator.deps = function () {
    var mixed = {}
    DEFINITION_TYPES.forEach(function (typeName) {
      if (typeName != 'lazyDependencies')
        mixed[typeName] = {}
      else
        mixed[typeName] = []
    })

    Array.prototype.forEach.call(arguments, function (arg) {
        if (typeof arg === typeof Function) {
          mixed['lazyDependencies'].push(arg)
        } else
          DEFINITION_TYPES.forEach(function (typeName) {
              for (var key in arg[typeName]) {
                  if (Object.hasOwnProperty.call(arg[typeName], key)) {
                      mixed[typeName][key] = arg[typeName][key]
                  }
              }
          })
    })

    return mixed
}

