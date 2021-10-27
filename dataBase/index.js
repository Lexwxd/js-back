const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('js-Todo', 'postgres', '1235', {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '/models/*.model.*'],
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  sequelize,
  initDB,
};