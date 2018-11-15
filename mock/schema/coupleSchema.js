var user = {
  type: 'object',
  required: ['id', 'firstName', 'lastName', 'avatarUrl', 'username'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid',
    },
    firstName: {
      type: 'string',
      faker: 'name.firstName',
    },
    lastName: {
      type: 'string',
      faker: 'name.lastName',
    },
    avatarUrl: {
      type: 'string',
      faker: 'image.avatar',
    },
    username: {
      type: 'string',
      faker: 'internet.userName',
    },
  },
};

var coupleSchema = {
  type: 'object',
  required: ['isSuccess', 'data'],
  properties: {
    isSuccess: true,
    data: {
      type: 'object',
      required: ['id', 'groom', 'bride', 'coverPhotoUrl', 'weddingDate', 'budget'],
      properties: {
        id: {
          type: 'string',
          faker: 'random.uuid',
        },
        groom: user,
        bride: user,
        coverPhotoUrl: {
          type: 'string',
          format: 'randomImage',
        },
        budget: {
          type: 'object',
          required: ['budgetTotal', 'fundsUsed', 'currency'],
          properties: {
            budgetTotal: {
              type: 'number',
              minimum: 700000,
              maximum: 800000,
            },
            fundsUsed: {
              type: 'number',
              minimum: 400000,
              maximum: 500000,
            },
            currency: {
              type: 'string',
              faker: 'finance.currencyCode',
            },
          },
        },
        weddingDate: {
          type: 'string',
          format: 'futureDate',
        },
      },
    },
  },
};

module.exports = coupleSchema;
