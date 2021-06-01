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

 
     // * PRELOAD DIETS
      ( async () => {
        const PreloadDiets = [
          { name: "gluten free", id: "1", image: "https://i0.wp.com/www.diegocoquillat.com/wp-content/uploads/2018/11/sin_gluten2.png" },
          { name: "dairy free",  id: "2", image: "https://www.bellezapura.com/wp-content/uploads/2010/03/p.lacteos.jpg"},
          { name: "lacto ovo vegetarian", id: "3", image: "https://i.pinimg.com/originals/7a/16/04/7a1604bde022682bc4e5fb63f9631dbf.jpg"},
          { name: "vegan", id: "4", image: "https://www.news-medical.net/image.axd?picture=2021%2F3%2Fshutterstock_1652895442.jpg"},
          { name: "primal", id: "5", image: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/salmon-salad-1296x728-header.jpg"},
          { name: "paleolithic", id: "6", image: "https://santacruzcore.com/wp-content/uploads/paleo-chicken-carrot-cabage-fish-1.jpg"},
          { name: "pescatarian",  id: "7", image: "https://cdn.prod.openfit.com/uploads/2019/09/09154549/pescatarian-diet-header-1200x600.jpg"},
        ]
      
        const dietas = await PreloadDiets.map(el=>{
            return  Diet.create(el)
        })
    
      })();
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
