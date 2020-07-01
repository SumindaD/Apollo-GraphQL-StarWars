const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    async getAllPeople() {
        console.log(`fetching all people`)
        const data = await this.get('people');
        return data.results;
    }

    async getPeopleById(id) {
        console.log(`fetching people by id: ${id}`)
        const data = await this.get(`people/${id}`);
        return data;
    }

    async searchPeopleByName(name) {
        console.log(`Searching people by name: ${name}`)
        const data = await this.get(`people/?search=${name}`);
        return data.results;
    }
}

module.exports = StarWarsAPI;