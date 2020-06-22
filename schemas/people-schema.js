const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type People {
        name: String!
  }

  type Query {
    people: [People]
  }
`;

const people = [
    {
        name: 'Luke Skywalker'
    },
    {
        name: 'C-3PO'
    },
  ];

exports.resolvers = {
  Query: {
    people: () => people
  }
};