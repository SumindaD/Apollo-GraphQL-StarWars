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
    url: String
  }`