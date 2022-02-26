const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const isValidToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!isValidToken) {
      response.status(400).json('Token not valid!');
    } else {
      next();
    }
  } catch (e) {
    console.log('isAuth: ' + e.message);
    if (e.message === 'jwt expired' ||
        e.message === 'jwt malformed') {
      response.status(401).json('You must be logged in!');
    } else {
      response.status(500).json('Something went wrong!');
    }
  }
}