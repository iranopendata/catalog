const ava = require('ava');
const fs = require('fs');
const path = require('path');
const validate = require('../validator');

const files = fs.readdirSync('../datasets/');
const datasets = files.filter((file) => file.endsWith('.toml'));
const numDatasets = datasets.length;

ava.test('All valid datasets', t => {
  t.plan(numDatasets);
  console.log(`Validating ${numDatasets} datasets`);

  datasets.forEach(function (dataset) {
    const data = fs.readFileSync(path.join('../datasets', dataset)).toString();

    t.true(validate(data));
  });
});
