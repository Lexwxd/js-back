const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('..');

class User extends Sequelize.Model { }

User.init({
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,  
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

}, {
  // Other model options go here
  sequelize: sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

const ToDo = require('./ToDo.model');
const Token = require('./Token.model');

User.hasMany(ToDo);
User.hasMany(Token);

Token.belongsTo(User, {
  foreignKey: 'userId'
});
ToDo.belongsTo(User, {
  foreignKey: 'userId'
});


module.exports = User;
