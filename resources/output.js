new GraphQLObjectType({
    name: "some name",
    description: "",
    fields: () => ({
        "title": {
            type: GraphQLString
        },
        "episode_id": {
            type: GraphQLInt
        },
        "opening_crawl": {
            type: GraphQLString
        },
        "director": {
            type: GraphQLString
        },
        "producer": {
            type: GraphQLString
        },
        "release_date": {
            type: GraphQLString
        },
        "characters": {
            type: new GraphQLList(GraphQLString)
        },
        "planets": {
            type: new GraphQLList(GraphQLString)
        },
        "starships": {
            type: new GraphQLList(GraphQLString)
        },
        "vehicles": {
            type: new GraphQLList(GraphQLString)
        },
        "species": {
            type: new GraphQLList(GraphQLString)
        },
        "created": {
            type: GraphQLString
        },
        "edited": {
            type: GraphQLString
        },
        "url": {
            type: GraphQLString
        },
    })
})

type SomeThing {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
}
