const DataLoader = require('dataloader');
const request = require('request');
const util = require('util')

const batchResources = async (urls) => {
    console.log('Dataloader Loading resources:' + urls)
    var resources = []

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

    return urls.map(url => resources.find(h => h.url === url));
};

module.exports = () => new DataLoader(batchResources);