var graphql = require('graphql')
var schema = require('./schema')
var expect = require('chai').expect

describe('index', function () {
    it('simple query', function (done) {
        var query = `
            query {
                foo {
                    fooKey
                }
                bars {
                    id
                    barKey
                }
            }
        `
        var expected = {
            data: {
                foo: { fooKey: 'foo value' },
                bars: [
                    { id: 0, barKey: 'bar value' },
                    { id: 1, barKey: 'bar value' },
                ],
            },
        }
        graphql.graphql(schema, query)
            .then(function (res) {
                expect(res).to.deep.equal(expected)
                done()
            })
            .catch(function (err) {
                done(err)
            })
    })
})
