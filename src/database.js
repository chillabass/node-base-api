const Seqelize = require('sequelize');
const sequelize = new Seqelize('node-base', 'chillabass', '123456', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
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
  },
  email: {
    type: Seqelize.STRING,
    allowNull: false,
  },
  password: {
    type: Seqelize.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: Seqelize.DATE,
    allowNull: false,
  },
  role: {
    type: Seqelize.STRING,
    allowNull: false,
  }
});

// sequelize.sync({force: true}).then((result) => {
//   console.log('Sequelize synchronized databse successfully!');
// });

module.exports.Users = Users;