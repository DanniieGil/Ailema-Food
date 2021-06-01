import {GET_RECIPES, GET_DETAIL_RECIPE, GET_DIETS} from "../actions/recipeActions";

const initialState = {
  recipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
      case GET_DETAIL_RECIPE:
        return {
          ...state,
          recipes: action.payload,
        };
        case GET_DIETS:
          return {
            ...state,
            diets: action.payload,
          };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
