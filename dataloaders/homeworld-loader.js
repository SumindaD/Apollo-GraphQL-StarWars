const DataLoader = require('dataloader');

module.exports = function createDataloaders(dataSources) {
    const batchHomeworlds = async (urls) => {
        const homeworlds = await dataSources.starWarsAPI.getResourcesBatch(urls);
        return urls.map(url => homeworlds.find(h => h.url === url));
    };
  
    return {
      homeworldLoader: new DataLoader(batchHomeworlds),
    }
};