var tv4 = require('tv4');
var toml = require('toml');

const spec = {
  'definitions': {
    'lang': {
      'type': 'string',
      'enum': ['fa', 'en']
    },
    'i18n': {
        'type': 'array',
        'minItems': 1,
        'items': {
          'type': 'object',
          'properties': {
            'lang': {'$ref': '#/definitions/lang'},
            'text': {
              'type': 'string'
            }
          }
        }
      },

    'id': {
      'type': 'string',
      'pattern': "^([a-z0-9._-])+$"
    },
    'resource': {
      'type': 'array',
      'items': {
        'type': 'object',
        'properties': {
          'name':  {$ref: '#/definitions/id'},
          'title': {$ref: '#/definitions/i18n'},
          'description': {$ref: '#/definitions/i18n'},
          'schema': {
            'type': 'object',
            'oneOf': [
              {'$ref': '#/definitions/csv'},
              {'$ref': '#/definitions/other'}
            ]
          },
        },
      }
    },
    'csv': {
      'type': 'object',
      'properties': {
        'format': {
          'type': 'string',
          'enum': ['csv']
        },
        'schema': {
          'type': 'object',
          'oneOf': [
            {'$ref': '#/definitions/csv'},
            {'$ref': '#/definitions/other'}
          ]
        },
      },
    }
  }
}

/*
 * Given a TOML string, make sure the file matches
 * the spec
 */
module.exports = function validate(tomlStr) {
  try {
    const parsed = toml.parse(tomlStr);
    var valid = tv4.validate(parsed, spec);

    if (!valid) {
      console.error(tv4.error);
    }
    return valid;
  }
  catch (e) {
    throw new Error('Could not parse ' + filename);
  }
}
