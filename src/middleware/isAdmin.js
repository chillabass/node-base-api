const users = require('../../models/index').sequelize.models.User;
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = jwt.decode(request.headers.authorization.split(' ')[1]);
    const userData = await users.findOne({
      where: {
        id: token.id,
      }
    });
    if (userData.dataValues.role === 'admin') {
      next();
    } else {
      response.status(403).json('User not admin!');
    }
  } catch (e) {
    console.log(e.message);
    response.status(500).json('Something went wrong!');
  }
}