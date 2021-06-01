const { Router } = require('express');
const RecipesRoute = require('./recipes.js')
const DietsRoute = require('./diets.js')

const router = Router();

// ! INDICE RUTAS
router.use('/recipes', RecipesRoute)
router.use('/diets', DietsRoute)

module.exports = router;
