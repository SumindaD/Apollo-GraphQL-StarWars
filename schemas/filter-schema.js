const { gql } = require('apollo-server');

exports.typeDefs = gql`
  input StringFilterInput {
      lt: String,
      gt: String,
      eq: String,
      ne: String,
      contains: String,
      like: String,
      notLike: String,
    }
`;