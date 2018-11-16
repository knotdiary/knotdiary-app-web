var vendor = {
  type: 'object',
  required: ['id', 'name', 'avatarUrl'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid',
    },
    name: {
      type: 'string',
      faker: 'lorem.sentence',
    },
    avatarUrl: {
      type: 'string',
      faker: 'image.avatar',
    },
  },
};

var checklist = {
  type: 'object',
  required: ['id', 'description', 'isDone', 'appointmentDate', 'vendor', 'checkListType'],
  properties: {
    id: {
      type: 'string',
      faker: 'random.uuid',
    },
    description: {
      type: 'string',
      faker: 'lorem.sentence',
    },
    appointmentDate: {
      type: 'string',
      format: 'futureDate',
    },
    checkListType: {
      type: 'number',
      minimum: 0,
      maximum: 20,
    },
    vendor: vendor,
    isDone: false,
  },
};

var checklistSchema = {
  type: 'array',
  minItems: 15,
  maxItems: 15,
  uniqueItems: true,
  items: checklist,
};

module.exports = checklistSchema;
