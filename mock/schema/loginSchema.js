var loginSchema = {
  type: 'object',
  properties: {
    access_token: {
      type: 'string',
      faker: 'random.uuid',
    },
  },
  required: ['access_token'],
};

module.exports = loginSchema;
