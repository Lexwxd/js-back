const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('..');

class Comment extends Sequelize.Model {}

Comment.init(
    {
        commentId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        text: {
            type: Sequelize.DataTypes.STRING,
            defaultValue:""
        },
        status: {
            type: Sequelize.DataTypes.ENUM({
                values: ['ACTIVE', 'DONE']
              }),
            defaultValue:"ACTIVE",
            allowNull: false
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'Comment' }
);

const ToDo = require('./ToDo.model');
//const Token = require('./Token.model');

ToDo.hasMany(Comment);

Comment.belongsTo(ToDo, {
  foreignKey: 'commentId'
});

module.exports = Comment;