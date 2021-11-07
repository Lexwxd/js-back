const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model { }

ToDo.init({
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  title: {
    type: Sequelize.STRING,
    default: "Titlo",
  },
  description: {
    type: Sequelize.STRING,
    default: "",
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
  commentId: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },

}, {
  // Other model options go here
  sequelize: sequelize, // We need to pass the connection instance
  modelName: 'ToDo' // We need to choose the model name
});





module.exports = ToDo;



