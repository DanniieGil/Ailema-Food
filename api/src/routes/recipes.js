const { Router } = require("express");
const RecipeController = require('../controllers/recipes')
const router = Router();

router.get("/", RecipeController.getAll);
router.get("/:id",RecipeController.getById);
router.post("/", RecipeController.add);
router.post("/:RecipeId/diet/:DietId", RecipeController.addDietToRecipe);
router.put("/:id",RecipeController.update);
router.delete("/:id",RecipeController.delete);

module.exports = router;
