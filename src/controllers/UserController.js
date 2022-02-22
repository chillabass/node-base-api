const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signUp: async function(request, response) {
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
          response.status(500).json('Something went wrong: ' + e.message);
        }
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  },

  auth: async function (request, response) {
    const userData = request.body;
    try {
      const user = await users.findOne({
        attributes: ['id', 'fullName', 'email', 'dateOfBirth', 'password'],
        where: {
          email: userData.email,
        },
      });
      if (user) {
        const isCorrectPassword = await bcrypt.compare(userData.password, user.dataValues.password);
        if (isCorrectPassword) {
          delete user.dataValues.password;
          const token = jwt.sign(user.dataValues, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES, });
          response.status(200).json({
            message: 'You auth successfully!',
            token,
          });
        } else {
          response.status(400).json('Email or Password incorrect!');
        }
      } else {
        response.status(400).json('Email or Password incorrect!');
      }
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  },

  getAll: async function (request, response) {
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
  },

  getUser: async function (request, response) {
    try {
      let user = await users.findOne({
        attributes: ['id', 'fullName', 'email', 'dateOfBirth', 'role'],
        where: { id: request.params.id }
      });
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(400).json(`User not found!`);
      }
    }
    catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  },

  deleteUser: async function (request, response) {
    try {
      const result = await users.destroy({
        where: {
          id: request.params.id,
        },
      });
      result ? response.json('User deleted!') : response.json('User not deleted!');
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  },

  updateUser: async function (request, response) {
    try {
      const changedData = request.body;
      if (changedData.hasOwnProperty('password')) {
        changedData['password'] = await bcrypt.hash(changedData.password, 10);
      }
      const result = await users.update(
        changedData,
        {
          where: {
            id: request.params.id,
          },
        });
      result ? response.json('User updated!') : response.json('User not updated!');
    } catch (e) {
      console.error(`Error: ${e.message}`);
      response.status(500).json('Something went wrong');
    }
  }
}