var generator = require('../..')
var define = generator.define
var deps = generator.deps
var fooType = require('./foo')
var barType = require('./bar')
var graphql = require('graphql')

var types = define(`
    type Query {
        foo: Foo
        bars: [Bar]
    }
`, {
    Query: {
        foo() {
            return {type: 'Foo'}
        },
        bars() {
            return [ {id: 0, type: 'Bar'}, {id: 1, type: 'Bar'} ]
        },
    },
}, deps(fooType, barType))

var objectTypes = types.objectTypes

module.exports = new graphql.GraphQLSchema({
    query: objectTypes['Query'],
    mutation: objectTypes['Mutation'],
    subscription: objectTypes['Subscription'],
})
