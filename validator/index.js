const ajv = require('ajv');
const toml = require('toml');

const validator = new ajv();

const spec = require('./spec.json');
/*
 * Given a TOML string, make sure the file matches
 * the spec
 */
module.exports = function validate(tomlStr) {
  try {
    const parsed = toml.parse(tomlStr);
    var valid = validator.validate(spec, parsed);

    if (!valid) {
      console.error("Error in dataset", parsed.name);
      console.error(validator.errors);
    }
    return valid;
  }
  catch (e) {
    throw new Error(e);
  }
}
