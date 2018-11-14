var tokenUserSchema = {
  type: 'object',
  required: ['isSuccess', 'data'],
  properties: {
    isSuccess: true,
    data: {
      type: 'object',
      required: ['id', 'username', 'firstName', 'lastName', 'avatarUrl', 'description', 'mobile', 'profileBackgroundUrl'],
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
        profileBackgroundUrl: {
          type: 'string',
          format: 'randomImage',
        },
        description: {
          type: 'string',
          faker: 'lorem.sentences',
        },
        mobile: {
          type: 'string',
          faker: 'phone.phoneNumber',
        },
      },
    },
  },
};

module.exports = tokenUserSchema;
