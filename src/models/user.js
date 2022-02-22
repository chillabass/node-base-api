require('dotenv').config();
const Seqelize = require('sequelize');
const sequelize = new Seqelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const Users = sequelize.define('users', {
  id: {
    type: Seqelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullName: {
    type: Seqelize.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-zА-Яа-я -]+$/i
    }
  },
  email: {
    type: Seqelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Seqelize.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: Seqelize.DATE,
    allowNull: false,
    validate: {
      isDate: true, 
    }
  },
  role: {
    type: Seqelize.STRING,
    allowNull: false,
  }
});

// sequelize.sync({force: true}).then((result) => {
//   console.log('Sequelize synchronized databse successfully!');
// });

module.exports = Users;