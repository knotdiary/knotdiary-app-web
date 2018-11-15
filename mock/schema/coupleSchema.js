var coupleSchema = {
  type: 'object',
  required: ['id', 'groom', 'bride', 'coverPhotoUrl', 'weddingDate', 'budget'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid',
    },
    groom: {
      type: 'object',
      required: ['id', 'firstName', 'lastName', 'avatarUrl'],
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
      },
    },
    bride: {
      type: 'object',
      required: ['id', 'firstName', 'lastName', 'avatarUrl'],
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
      },
    },
    coverPhotoUrl: {
      type: 'string',
      faker: 'randomImage',
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
};

module.exports = coupleSchema;
