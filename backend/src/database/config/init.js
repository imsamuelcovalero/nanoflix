/* src/database/config/init.js */
const sequelize = require('../models');
const User = require('./models/User')(sequelize);

Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = { sequelize, User };