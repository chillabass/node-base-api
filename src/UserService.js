const users = require('./database').Users;

class UserService {
  async signUp(data) {
    const user = await users.findOne({where: {email: data.email}});
    if (user) {
      console.log('exists');
      return 'Email already exists!';
    } else {
      await users.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
      })
      .then(result => {
        console.log('add');
        return result;
      })
      .catch(e => e.message);
    }
  }

  async getAll() {
    return await users.findAll({ raw: true });
  }
}

module.exports.UserService = new UserService();