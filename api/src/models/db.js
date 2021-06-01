const { Sequelize } = require('sequelize');
const RecipesFactory = require('./Recipes')
const DietsFactory = require('./Diets')
const { dbUser, dbPass, dbName, dbHost, dbPort } = require("../utils/config/index");

// ! CONNECT DATABASE
const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`,
  { logging: false,  native: false, }
);
const Recipe = RecipesFactory(sequelize);
const Diet = DietsFactory(sequelize);

// ! CARDINALIDAD
Recipe.belongsToMany(Diet, { through: "RecipeDiet" });
Diet.belongsToMany(Recipe, { through: "RecipeDiet" });

module.exports = {
  conn: sequelize,
  Recipe,
  Diet,
};
