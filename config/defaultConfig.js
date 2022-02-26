module.exports = {
  development: {
    domain: '127.0.0.1',
    port: 5432,
    jwt: {
      secret: 'enter your secret here',
      expiresIn: '100h',
    },
    hash: {
      type: 'md5',
      key: 'HkRGfo',
    },
  },
  production: {
    domain: '127.0.0.1',
    port: 5432,
    jwt: {
      secret: 'enter your secret here',
      expiresIn: '100h',
    },
    hash: {
      type: 'md5',
      key: 'HkRGfo',
    },
  },
};
