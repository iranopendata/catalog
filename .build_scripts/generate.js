const fs = require('fs');
const path = require('path');
const toml = require('toml');
const mkdirp = require('mkdirp');

const DATASET_DIR = path.join(__dirname, '..', 'datasets');

/* Create the output directory */
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const API_DIR = path.join(OUTPUT_DIR, 'datasets');
mkdirp.sync(API_DIR);

/* Get the list of datasets */
const files = fs.readdirSync(DATASET_DIR);
const datasets = files.filter((file) => file.endsWith('.toml'));

/* For each dataset, turn the TOML to JSON and write it to a file */
var index = {
  "meta": {
    count: datasets.count,
    version: 'draft-v1',
    homepage: 'http://iranopendata.github.io/catalog'
  },
  "datasets": []
};
datasets.forEach(function (dataset) {
  const tomlData = fs.readFileSync(path.join(DATASET_DIR, dataset)).toString();
  const parsedData = toml.parse(tomlData);

  const id = parsedData.name;
  if (!id) throw new Error('Dataset does not have an id! Aborting.');

  const datasetPath = path.join(API_DIR, `${id}.json`);

  if (!fsExistsSync(datasetPath)) {
    fs.writeFileSync(datasetPath, JSON.stringify(parsedData));
  } else {
    throw new Error(`Dataset ${id} does not have a unique id. Aborting`);
  }
  var listing = {'name': id,
                 'created_at': parsedData.created_at,
                 'title': parsedData.title,
                 'author': parsedData.author
                };

  index.datasets.push(listing);
});

/* Write out index file */
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index));

function fsExistsSync(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
