# graphql-generator
> Graphql schema generator


## Installation

    npm install --save graphql-generator


## Examples

```js
var graphql = require('graphql')
var generate = require('graphql-generator')

var schema = generate(`
  type Person {
    name: String
    age: Int
  }

  type Query {
    person: Person
  }

  input PersonInput {
    name: String
    age: Int!
  }

  type Mutation {
    update_person(person: PersonInput): Person
  }
`, {
  Query: {
    person: function () {
      return {
        name: 'Matt'
      }
    }
  },
  Mutation: {
    update_person: function (m, args) {
      return {
        name: args.person.name,
        age: args.person.age
      }
    }
  }
})

var out = graphql.graphql(schema, `
  query A {
    person {
      name
    }
  }
`, {
  person: {
    name: 'Matt',
    age: 25
  }
}).then(res => console.log(res))
```

## Credits

* [graph.ql](https://github.com/matthewmueller/graph.ql)
* [graphql-schema-gen](https://github.com/ForbesLindesay/graphql-schema-gen)


## License

MIT
