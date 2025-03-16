const { Model, DataTypes } = require('sequelize');

'use strict';
module.exports = (sequelize) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Movie, { foreignKey: 'movie_id' });
      Review.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Review.init(
    {
      movie_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      underscored: true,
      timestamps: true,
    }
  );

  return Review;
};