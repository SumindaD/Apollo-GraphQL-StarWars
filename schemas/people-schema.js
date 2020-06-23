const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type People {
        name: String,
        height: Int,
        mass: Int,
        hair_color: String,
        skin_color: String,
        eye_color: String,
        birth_year: String,
        gender: String,
        homeworld: String,
        created: String,
        edited: String,
        url: String
  }

  type Query {
    people: [People],
    peopleById(id: Int): People
  }
`;

exports.resolvers = {
  Query: {
    people: (parent, args, { dataSources }, info) => {
      return dataSources.starWarsAPI.getAllPeople()
    },
    peopleById: (parent, { id }, { dataSources }, info) => {
      return dataSources.starWarsAPI.getPeopleById(id)
    }
  }
};