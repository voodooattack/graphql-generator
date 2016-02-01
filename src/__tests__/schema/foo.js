var generator = require('../..')
var define = generator.define

module.exports = define(`
    type Foo {
        fooKey: String!
    }
`, {
    Foo: {
        fooKey() {
            return 'foo value'
        },
    },
})
