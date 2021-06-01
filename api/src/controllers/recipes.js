const axios = require("axios");
const { RECIPE_URL } = require("../utils/config");
const { Recipe, Diet } = require("../models/db");
const ModelCRUD = require("./index");

class RecipeModel extends ModelCRUD {
  constructor(model) {
    super(model);
  }

  getAll = (req, res, next) => {
    const myRecipe = this.model.findAll({
      include: {
        model: Diet,
      },
    });
    const apiRecipes = axios.get(RECIPE_URL);
    Promise.all([myRecipe, apiRecipes])
      .then((results) => {
        const [myRecipeResults, apiRecipesResults] = results;
        const response = myRecipeResults.concat(apiRecipesResults.data.results);
        res.send(response);
      })
      .catch((error) => next(error));

 

  };

  addDietToRecipe = (req, res, next) => {
    const { RecipeId, DietId } = req.params;
    this.model
      .findByPk(RecipeId)
      .then((Recipe) => {
        return Recipe.addDiet(DietId);
      })
      .then(() => res.sendStatus(200))
      .catch((error) => next(error));
  };
}

const RecipeController = new RecipeModel(Recipe);

module.exports = RecipeController;
