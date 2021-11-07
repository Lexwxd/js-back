const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('js-Todo', 'postgres', '1235', {
  host: 'localhost',
  dialect: 'postgres',
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.dropSchema('public', {});
    // await sequelize.createSchema('public', {});
    await sequelize.sync();
    console.log('Sequelize was initialized');
  }
  catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  sequelize,
  initDB,
};