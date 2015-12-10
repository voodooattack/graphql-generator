/**
 * Module Dependencies
 */

var graphql = require('graphql')
var GraphQLLanguage = require('graphql/language')

var generator = require('./lib/generator')

module.exports = function generate (schema, implementation) {
    var ast = GraphQLLanguage.parse(schema, {noLocation: true})
    var types = generator(ast, implementation)
    var object_types = types.objectTypes

    return new graphql.GraphQLSchema({
        query: object_types['Query'],
        mutation: object_types['Mutation'],
        subscription: object_types['Subscription']
    });
}
