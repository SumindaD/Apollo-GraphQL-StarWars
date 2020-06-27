const { gql } = require('apollo-server');

exports.typeDefs = gql`

type Planet{
    name: String,
    rotation_period: String,
    orbital_period: String,
    diameter: String,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: String,
    created: String,
    edited: String,
    url: String,
    residents: [String],
    resident_people: [People]
  }
`;


  exports.resolvers = {
  Planet: {
    resident_people: (parent, args, { resourceLoader }, info) => {
      var people = []
      parent.residents.forEach(function(resident) {
        people.push(resourceLoader.load(resident))
      });

      return people
    }
  }
};