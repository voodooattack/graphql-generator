var generator = require('../..')
var define = generator.define
var deps = generator.deps
var objectType = require('./object')
var uuid = 0

module.exports = define(`
    type Foo {
        fooKey: String!
    }
`, {
    Foo: {
        id() {
            return uuid++
        },
        fooKey() {
            return 'foo value'
        },
        isTypeOf(obj) {
            return obj.type === 'Foo'
        },
    },
}, deps(objectType))
