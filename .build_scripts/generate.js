const fs = require('fs');
const path = require('path');
const toml = require('toml');
const mkdirp = require('mkdirp');
const request = require('request');

const DATASET_DIR = path.join(__dirname, '..', 'datasets');

/* Create the output directory */
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const API_DIR = path.join(OUTPUT_DIR, 'datasets');
mkdirp.sync(API_DIR);

/* Get the list of datasets */
const files = fs.readdirSync(DATASET_DIR);
const datasets = files.filter((file) => file.endsWith('.toml'));

/* Process list of changed datasets*/ 
const changed = fs.readFileSync(path.join(__dirname, 'ids.txt'))
  .toString()
  .split('\n')
  .map( (input) => (input.substr(0, input.lastIndexOf('.')) || input) );

/* Initial index stub */ 
var index = {
  "meta": {
    count: datasets.count,
    version: 'draft-v1',
    homepage: 'http://iranopendata.github.io/catalog'
  },
  "datasets": []
};

/* Get current date */
const now = (new Date()).toISOString();

/* Dataset timestamps depend on the current state of the API */
request({
  json: true, 
  uri: 'https://iranopendata.github.io/catalog/index.json',
  method: 'GET',
  gzip: true
}, function (err, response, body) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  const fromAPI = body.datasets;
  let apiDatasets = {};
  fromAPI.forEach((dataset) => {
    apiDatasets[dataset.name] = dataset;
  })


  datasets.forEach(function (dataset) {
    const wasUpdated = changed.includes(dataset);
    const tomlData = fs.readFileSync(path.join(DATASET_DIR, dataset)).toString();
    const parsedData = toml.parse(tomlData);

    const id = parsedData.name;
    if (!id) throw new Error('Dataset does not have an id! Aborting.');
    const datasetPath = path.join(API_DIR, `${id}.json`);

    // Timestamp indexed_at
    // If file already exists in the index, use the previous indexed_at
    // else use the current date
    if (id in apiDatasets) {
      let current_listing = apiDatasets[id];
      parsedData.indexed_at = current_listing.indexed_at;
      parsedData.updated_at = current_listing.updated_at;
    }
    else {
      parsedData.indexed_at = now;
      parsedData.updated_at = now;
    }

    // Timestamp updated_at
    // If the datasets is updated or doesn't have an updated_at use current time
    if (wasUpdated) {
      parsedData.updated_at = now;    
    }

    // Make sure ids are unique
    if (!fsExistsSync(datasetPath)) {
      fs.writeFileSync(datasetPath, JSON.stringify(parsedData));
    } else {
      throw new Error(`Dataset ${id} does not have a unique id. Aborting`);
    }

    /* Generate listing */
    var listing = {
      'name': id,
      'updated_at': parsedData.updated_at,
      'indexed_at': parsedData.indexed_at,
      'title': parsedData.title,
      'description': parsedData.description,
      'period': parsedData.period,
      'source': parsedData.resources[0].sources[0].name, // We only use the first source
      'category': parsedData.category,
      'format': parsedData.resources[0].schema.format // We only consider one resource
    };

    index.datasets.push(listing);
  });

  /* Write out index file */
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index));

});

function fsExistsSync(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
