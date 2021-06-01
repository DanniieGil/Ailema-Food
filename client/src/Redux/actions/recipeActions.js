import axios from "axios";
import {RECIPE_URL, DIET_URL} from '../../Config/index'
export const GET_RECIPES = 'GET_RECIPES';
export const GET_DETAIL_RECIPE = 'GET_DETAIL_RECIPE';
export const GET_DIETS = 'GET_DIETS';


// ! GET RECIPES
export function getRecipes() {
  return function (dispatch) {
    return axios.get(RECIPE_URL).then((response) => {
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    });
  };
}

// ! GET DIETS
export function getDiets() {
  return function (dispatch) {
    return axios.get(DIET_URL).then((response) => {
      console.log("aqui")
      dispatch({
        type: GET_DIETS,
        payload: response.data,
      });
    }
    )
    .catch(error=>{
      console.log(error)
    })
  };
}

// ! GET RECIPE DETAIL [DONT USED - OPTIONAL]
export function getDetailRecipe(id_Recipe) {
  return function (dispatch) {
    return axios.get(`https://api.spoonacular.com/recipes/${id_Recipe}/information?apiKey=c352b5af55664c1b8d4588a2fc2e38c0`).then((response) => {
      console.log("aqui")
      dispatch({
        type: GET_DETAIL_RECIPE,
        payload: response.data,
      });
    }
    )
    .catch(error=>{
      console.log(error)
    })
  };
}

