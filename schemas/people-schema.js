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
    created: String,
    edited: String,
    url: String,
    homeworld: String,
    homeworld_planet: Planet
  }

  input PeopleFilterInput {
    name: StringFilterInput,
    height: StringFilterInput,
    OR: [PeopleFilterInput!]
  }

  type Query {
    people: [People],
    peopleById(id: Int): People,
    peopleFilter(filter: PeopleFilterInput): [People]
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
    },
    peopleFilter: async (parent, { filter }, { dataSources }, info) => {
      var result = []

      if (filter.OR){
        await Promise.all(filter.OR.map(async (item) => {
          for(const fieldName in item){
            if(fieldName == "name"){
              for(const operator in item[fieldName]){
                if (operator == "contains"){
                  await dataSources.starWarsAPI.searchPeopleByName(item[fieldName][operator]).then(data => 
                    { 
                      result = result.concat(data) 
                    })
                }
              }
            }
          }
        }));
      }

      return result
    }
  },
  People: {
    homeworld_planet: (parent, args, { resourceLoader }, info) => {
      return resourceLoader.load(parent.homeworld)
    }
  }
};