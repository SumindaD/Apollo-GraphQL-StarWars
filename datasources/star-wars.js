const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    async getAllPeople() {
        const data = await this.get('people');
        return data.results;
    }

    async getPeopleById(id) {
        const data = await this.get(`people/${id}`);
        return data;
    }
}

module.exports = StarWarsAPI;