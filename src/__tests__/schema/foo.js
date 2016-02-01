var generator = require('../..')
var define = generator.define
var deps = generator.deps
var objectType = require('./object')

module.exports = define(`
    type Foo {
        fooKey: String!
    }
`, {
    Foo: {
        fooKey() {
            return 'foo value'
        },
        isTypeOf(obj) {
            return obj.type === 'Foo'
        },
    },
}, deps(objectType))
