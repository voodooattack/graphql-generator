var generator = require('../..')
var define = generator.define

module.exports = define(`
    type Bar {
        barKey: String!
    }
`, {
    Bar: {
        barKey() {
            return 'bar value'
        },
    },
})
