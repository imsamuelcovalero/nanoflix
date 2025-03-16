const { Model, DataTypes, Sequelize } = require('sequelize');

'use strict';
module.exports = (sequelize) => {
  class Movie extends Model {}

  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
      tableName: 'movies',
      underscored: true,
      timestamps: true,
    }
  );

  return Movie;
};