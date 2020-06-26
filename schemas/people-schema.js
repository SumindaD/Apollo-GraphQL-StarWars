const { gql } = require('apollo-server');
const DataLoader = require("dataloader")

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
    created: String,
    edited: String,
    url: String,
    homeworld: String,
    homeworld_planet: Planet
  }

  type Query {
    people: [People],
    peopleById(id: Int): People
  }
`;

exports.resolvers = {
  Query: {
    people: (parent, args, { dataSources }, info) => {
      console.log(`fetching all people!`)
      return dataSources.starWarsAPI.getAllPeople()
    },
    peopleById: (parent, { id }, { dataSources }, info) => {
      console.log(`fetching people by id: ${id}`)
      return dataSources.starWarsAPI.getPeopleById(id)
    }
  },
  People: {
    homeworld_planet: (parent, args, { homeworldLoader }, info) => {
      return homeworldLoader.homeworldLoader.load(parent.homeworld)
    }
  }
};