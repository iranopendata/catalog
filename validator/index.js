const ajv = require('ajv');
const toml = require('toml');

const validator = new ajv();

const spec = {
  '$schema': 'http://json-schema.org/schema#',
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
    },
    'other': {
      'type': 'object',
      'properties': {
        'format': {
          'type': 'string',
          'enum': ['XML', 'JSON']
        }
      }
    }
  },
  'type': 'object',
  'properties': {
    'license': {
      'type': 'string'
    },
    'keywords': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'created_at': {
      'type': 'string',
      'format': 'date'
    },
    'updated_at': {
      'type': 'string',
      'format': 'date'
    },
    'period': {
      'type': 'array',
      'minItems': 2,
      'maxItems': 2,
      'items': {
        'type': 'number'
      }
    },
    'frequency': {
      'type': 'string',
      'enum': ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']
    },
    'author': {
      'type': 'string'
    },
    'homepage': {
      'type': 'string',
      'format': 'uri'
    },
    'name': {
      'type': 'string'
    },
    'title': {'$ref': '#/definitions/i18n'},
    'description': {'$ref': '#/definitions/i18n'},
    'resources': {
      'type': 'array',
      'items': {'$ref': '#/definitions/resource'}
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
    var valid = validator.validate(spec, parsed);

    if (!valid) {
      console.error(validator.errors);
    }
    return valid;
  }
  catch (e) {
    throw new Error(e);
  }
}
