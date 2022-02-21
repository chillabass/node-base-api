const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = request.headers['authorization'];
    const isValidToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!isValidToken) {
      response.status(400).json('Token not valid!');
    } else {
      next();
    }
  } catch (e) {
    console.log('isAuth: ' + e.message);
    if (e.message === 'jwt expired') {
      response.status(403).json('You must be logged in!');
    } else {
      response.status(403).json('Something went wrong!');
    }
  }
}