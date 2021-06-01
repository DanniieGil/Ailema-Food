const { DataTypes } = require("sequelize");

// ! TABLE DIETS
// ? [id, name, image]

module.exports = (sequelize) => {
  return sequelize.define("diet", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { type: DataTypes.STRING, allowNull: false },
  });
};





