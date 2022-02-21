const users = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = jwt.decode(request.headers['authorization']);
    const userData = await users.findOne({
      where: {
        id: token.id,
      }
    });
    if (userData.dataValues.role === 'admin') {
      next();
    } else {
      response.status(400).json('User not admin!');
    }
  } catch (e) {
    console.log(e.message);
    response.status(403).json('Something went wrong!');
  }
}