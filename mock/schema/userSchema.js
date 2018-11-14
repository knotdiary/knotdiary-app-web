var userSchema = {
  type: 'array',
  minItems: 5,
  maxItems: 8,
  uniqueItems: true,
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        faker: 'random.uuid',
      },
      username: {
        type: 'string',
        faker: 'internet.userName',
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
      description: {
        type: 'string',
        faker: 'lorem.sentences',
      },
      mobile: {
        type: 'string',
        faker: 'phone.phoneNumber',
      },
      profileBackgroundUrl: {
        type: 'string',
        format: 'randomImage',
      },
    },
    required: ['id', 'username', 'firstName', 'lastName', 'avatarUrl', 'description', 'mobile', 'profileBackgroundUrl'],
  },
};

module.exports = userSchema;
