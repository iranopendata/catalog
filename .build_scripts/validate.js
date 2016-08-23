const ava = require('ava');
const fs = require('fs');
const path = require('path');
const validate = require('../validator');
const toml = require('toml');

const files = fs.readdirSync('../datasets/');
const datasets = files.filter((file) => file.endsWith('.toml'));
const numDatasets = datasets.length;

const data = datasets.map(function (dataset) {
  return fs.readFileSync(path.join('../datasets', dataset)).toString();
})

ava.test('All valid datasets', t => {
  t.plan(numDatasets);
  console.log(`Validating ${numDatasets} datasets`);

  data.forEach(function (item) {
    t.true(validate(item), 'Dataset metadata should conform to specification');
  });
});

ava.test('All unique dataset names', t => {
  t.plan(numDatasets);

  var names = new Set();

  data.forEach(function (item) {
    const parsedItem = toml.parse(item);
    const itemName = parsedItem.name;
    t.false(names.has(itemName), 'Dataset id should be unique');
    names.add(itemName);
  });
});
