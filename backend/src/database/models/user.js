'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Futuras associações serão definidas aqui
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garantir que não haja e-mails duplicados
        validate: {
          isEmail: true, // Validação automática para e-mails
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // Pode ser 'admin' ou 'user'
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users', // Definindo explicitamente o nome da tabela
      underscored: true, // Converte camelCase para snake_case no banco
      timestamps: true, // Habilita createdAt e updatedAt automaticamente
    }
  );

  return User;
};
