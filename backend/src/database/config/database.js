/* src/database/config/database.js */
require('dotenv').config();

const options = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nanoflix-db',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  dialect: 'mysql',
};

module.exports = {
  development: {
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
    ...options,
  },
  test: {
    logging: false,
    ...options,
  },
  production: {
    logging: false,
    ...options,
  },
};
