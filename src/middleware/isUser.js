const users = require('../../models/index').sequelize.models.User;
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];;
    const decodeToken = jwt.decode(token);
    const userData = await users.findOne({
      where: {
        id: decodeToken.id,
      }
    });
    if (userData.dataValues.id === +request.params.id) {
      next();
    } else {
      response.status(403).json('You can only update your profile!');
    }
  } catch (e) {
    console.log(e.message);
    response.status(500).json('Something went wrong!');
  }
}