const users = require('../../models/index').sequelize.models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async (request, response) => {
  try {
    const { fullName, email, password, dateOfBirth } = request.body;
    const user = await users.findOne({
      attributes: ['email'],
      where: { email, }
    });
    if (user) {
      return response.status(409).json(`Error: User with this email already exists!`);
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await users.create({
      fullName,
      email,
      password: encryptedPassword,
      dateOfBirth,
      role: 'user',
    });
    delete createdUser.dataValues.password;
    const token = jwt.sign(createdUser.dataValues, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES, });
    response.status(200).json({
      message: 'User created!',
      token,
    });
  } catch (e) {
    console.error(`Error: ${e.message}`);
    response.status(500).json('Something went wrong');
  }
}

const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await users.findOne({
      attributes: ['id', 'fullName', 'email', 'dateOfBirth', 'password'],
      where: {
        email,
      },
    });
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.dataValues.password);
      if (isCorrectPassword) {
        delete user.dataValues.password;
        const token = jwt.sign(user.dataValues, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES, });
        return response.status(200).json({
          message: 'You auth successfully!',
          token,
          user,
        });
      }
    }
    return response.status(400).json('Email or Password incorrect!');
  } catch (e) {
    console.error(`Error: ${e.message}`);
    response.status(500).json('Something went wrong');
  }
}

const getAll = async (request, response) => {
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

const getUser = async (request, response) => {
  try {
    const user = await users.findOne({
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
}

const deleteUser = async (request, response) => {
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
}

const updateUser = async (request, response) => {
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

module.exports = {
  signUp,
  signIn,
  getAll,
  getUser,
  deleteUser,
  updateUser
};