const { DataTypes } = require('sequelize');

// ! TABLE RECIPES
// ? [id, name, summary, rating, healthy, steps]

module.exports = (sequelize) => {
  return sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.STRING, allowNull: false },
    aggregateLikes: { type: DataTypes.STRING, allowNull: false },
    healthScore: { type: DataTypes.INTEGER, allowNull: false },
    readyInMinutes: { type: DataTypes.INTEGER, allowNull: false },
    servings: { type: DataTypes.INTEGER, allowNull: false },
    vegan: { type: DataTypes.BOOLEAN, allowNull: false },
    vegetarian: { type: DataTypes.BOOLEAN, allowNull: false },
    veryHealthy: { type: DataTypes.BOOLEAN, allowNull: false },
    veryPopular: { type: DataTypes.BOOLEAN, allowNull: false },
    steps: { type: DataTypes.STRING, allowNull: false },
  });
};
