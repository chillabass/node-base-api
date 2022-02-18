const users = require('../database').Users;
const bcrypt = require('bcrypt');

class UserController {
  async signUp(request, response) {
    try {
      const data = request.body;
      const user = await users.findOne({
        attributes: ['email'],
        where: { email: data.email }
      });
      if (user) {
        response.status(409).json(`Error: User with this email already exists!`);
      } else {
        try {
          const encryptedPassword = await bcrypt.hash(data.password, 10);
          await users.create({
            fullName: data.fullName,
            email: data.email,
            password: encryptedPassword,
            dateOfBirth: data.dob,
            role: 'user',
          });
          response.status(200).json('User created!');
        }
        catch (e) {
          console.error(`Error: ${e.message}`);
          response.status(500).json('Something went wrong');
        }
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }

  async auth(request, response) {
    const userData = request.body;
    try {
      const user = await users.findOne({
        attributes: ['password'],
        where: {
          email: userData.email,
        },
      });
      if (user) {
        const isCorrectPassword = await bcrypt.compare(userData.password, user.dataValues.password);
        if (isCorrectPassword) {
          response.json('You auth successfully!');
        } else {
          response.json('Password incorrect!');
        }
      } else {
        response.json('Email incorrect!');
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }

  async getAll(request, response) {
    try {
      const userList = await users.findAll({
        attributes: ['id', 'password', 'fullName', 'email', 'dateOfBirth', 'role'],
        raw: true
      });
      response.status(200).json(userList);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }

  async getUser(request, response) {
    console.log(`${request.body.name} try to get user`);
    try {
      let user = await users.findOne({
        attributes: ['id', 'fullName', 'email', 'dateOfBirth', 'role'],
        where: { id: request.params.id }
      });
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(409).json(`User not found!`);
      }
    }
    catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }

  async deleteUser(request, response) {
    try {
      const result = await users.destroy({
        where: {
          id: request.params.id,
        },
      });
      result ? response.json('User deleted!') : response.json('User not deleted!');
    } catch(e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }

  async updateUser(request, response) {
    try {
      const changedData = request.body;
      const result = await users.update(
        changedData,
        {
        where: {
          id: request.params.id,
        },
      });
      result ? response.json('User updated!') : response.json('User not updated!');
    } catch(e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }
}

module.exports.UserController = new UserController();