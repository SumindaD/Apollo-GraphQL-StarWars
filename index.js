const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypeDefs } = require('graphql-tools-merge-typedefs');

const peopleSchema = require('./schemas/people-schema');
const planetSchema = require('./schemas/planet-schema');
const filterSchema = require('./schemas/filter-schema');
const StarWarsAPI = require('./datasources/star-wars');
const resourceLoader = require('./dataloaders/resource-loader');

// merge conflicting "Query", "Mutation", and "Subscription" definitions
const typeDefs = mergeTypeDefs([
  planetSchema.typeDefs,
  peopleSchema.typeDefs,
  filterSchema.typeDefs
]);

const resolvers = [
  peopleSchema.resolvers,
  planetSchema.resolvers
];

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({ 
  schema,
  dataSources: () => ({
    starWarsAPI: new StarWarsAPI()
  }),
  context: () => ({
    resourceLoader:  resourceLoader()
  })
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});