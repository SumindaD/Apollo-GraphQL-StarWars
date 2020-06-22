const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs');
const peopleSchema = require('./schemas/people-schema');


// merge conflicting "Query", "Mutation", and "Subscription" definitions
const typeDefs = mergeTypeDefs([
    peopleSchema.typeDefs
]);

const resolvers = [
    peopleSchema.resolvers
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});