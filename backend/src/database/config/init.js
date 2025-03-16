/* src/database/config/init.js */
const sequelize = require('../models'); // Agora puxa corretamente o sequelize
const User = require('./models/User')(sequelize);

// Executa todas as associações entre os modelos
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = { sequelize, User };