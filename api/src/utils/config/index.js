require('dotenv').config()
const RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&offset=0&number=100`;
const DIET_URL = `https://api.spoonacular.com/recipes/diet?apiKey=${process.env.API_KEY}`;

module.exports = {
    portServer : process.env.SERVER_PORT || '3001',
    dbPort : process.env.DB_PORT || '5432',
    dbUser : process.env.DB_USER || 'postgres',
    dbPass : process.env.DB_PASSWORD || '123456',
    dbName : process.env.DB_NAME || 'food',
    dbHost : process.env.DB_HOST || 'localhost',
    Api : process.env.API_KEY,
    RECIPE_URL,
    DIET_URL
}