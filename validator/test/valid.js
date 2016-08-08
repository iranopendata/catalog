var ava = require('ava');
var fs = require('fs');
var validate = require('..');

ava.test('valid', t => {
  const valid = fs.readFileSync('fixtures/valid.toml').toString();
  t.true(validate(valid));
});
