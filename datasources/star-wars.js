const { RESTDataSource } = require('apollo-datasource-rest');
const request = require('request');
const util = require('util')

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

    async getResource(url) {
        const data = await this.get(url);
        return data;
    }

    async getResourcesBatch(urls){
        var resources = []
        
        console.log('Fetching batch resources:' + urls)

        var i;
        for (i = 0; i < urls.length; i++) {
            
            const requestPromise = util.promisify(request);
            const response = await requestPromise(urls[i]);

            if (response.statusCode == 200){
                resources.push(JSON.parse(response.body))
            }else{
                console.error('Error fetching resource:', response.error);
            }
            
        };

        return resources
    }
}

module.exports = StarWarsAPI;