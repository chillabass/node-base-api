const users = require('./database').Users;

class UserService {
  async signUp(data) {
    await users.findOne({ where: { email: data.email } })
    .then(result => {
      console.log(`users = ${result}`);
      if (result) {
        return {
          message: 'User with this email already exists!'
        };
      } else {
        users.create({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dob
        })
        .then(result => {
          console.log(`create result = ${result}`);
          return result;
        })
        .catch(e => {
          console.log(`create catch = ${e.message}`);
          return e.message;
        });
      }
    });
  }

  async getAll() {
    const userList = await users.findAll({ raw: true });
    return userList;
  }
}

module.exports.UserService = new UserService();