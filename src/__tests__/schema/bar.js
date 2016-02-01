var generator = require('../..')
var define = generator.define
var deps = generator.deps
var objectType = require('./object')

module.exports = define(`
    type Bar implements Object {
        id: Int!
        barKey: String!
    }
`, {
    Bar: {
        barKey() {
            return 'bar value'
        },
        isTypeOf(obj) {
            return obj.type === 'Bar'
        },
    },
}, deps(objectType))
