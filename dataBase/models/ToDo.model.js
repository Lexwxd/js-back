const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model { }

ToDo.init({
  userid: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  isDone: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  isFavourite: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  priority: {
    type: Sequelize.SMALLINT,
    defaultValue: 1
  },
}, {
  // Other model options go here
  sequelize: sequelize, // We need to pass the connection instance
  modelName: 'ToDo' // We need to choose the model name
});

module.exports = ToDo

