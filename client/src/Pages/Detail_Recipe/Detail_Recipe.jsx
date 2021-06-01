import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { getDetailRecipe } from '../../Redux/actions/recipeActions'
import './Detail_Recipe.css'

function Detail_Recipe({ Recipe_Detailed, getDetailRecipe }) {

    const { id } = useParams();
    const ID_Recipe = Recipe_Detailed.filter(el => el.id == id)[0]

    return <div className="content">
        <div className="content_Alldetail">
            <div className="title_recipe">{ID_Recipe.title.toUpperCase()} </div>

            <div className="header_card">
                <div className="image_container"><img src={ID_Recipe.image} alt="" className="image_recipe" /></div>
                <div className="summary_recipe" dangerouslySetInnerHTML={{ __html: ID_Recipe["summary"] }}></div>
                <div className="likes_recipe">Likes: {ID_Recipe.aggregateLikes} <i class='bx bxs-like'></i></div>
                <div className="health_recipe">Health: {ID_Recipe.healthScore} <i class='bx bxs-heart'></i> </div>
            </div>

            <div className="recommends_recipe">
                <div className="recommend_unit">Vegan: {ID_Recipe.vegan ? <i class='bx bxs-check-circle'></i> : <i class='bx bxs-x-circle'></i>} </div>
                <div className="recommend_unit">Vegetarian: {ID_Recipe.vegetarian ? <i class='bx bxs-check-circle'></i> : <i class='bx bxs-x-circle'></i>} </div>
                <div className="recommend_unit">Very Healthy: {ID_Recipe.veryHealthy ? <i class='bx bxs-check-circle'></i> : <i class='bx bxs-x-circle'></i>} </div>
                <div className="recommend_unit">Very Popular: {ID_Recipe.veryPopular ? <i class='bx bxs-check-circle'></i> : <i class='bx bxs-x-circle'></i>} </div>
            </div>

        <div class="warpper">
            <input class="radio" id="cero" name="group" type="radio" checked/>
            <input class="radio" id="one" name="group" type="radio"/>
            <input class="radio" id="two" name="group" type="radio" />
            <input class="radio" id="three" name="group" type="radio" />
            <div class="tabs">
                <label class="tab" id="cero-tab" for="cero">Information</label>
                <label class="tab" id="one-tab" for="one">Ingredients</label>
                <label class="tab" id="two-tab" for="two">Equipments</label>
                <label class="tab" id="three-tab" for="three">Steps</label>
            </div>

            <div class="panels">
            <div class="panel" id="cero-panel">
            <div>Diets:
           
           {ID_Recipe.diets[0] && ID_Recipe.diets.map((el, index) => {
               if (el.name) {  return " - " + el.name } 
               else { return " - " + el  }
           })}
   </div>

   <div>{ ID_Recipe.cuisines && ID_Recipe.cuisines[0] ? "Cuisines:" : ""}
   {console.log(ID_Recipe.cuisines)}
   {ID_Recipe.cuisines && ID_Recipe.cuisines.map(el=>{
       if (el) {  return " - " + el } 
   })}
   </div>

   <div>{ ID_Recipe.occasions && ID_Recipe.occasions[0] ? "Occasions:" : ""}
   {ID_Recipe.occasions && ID_Recipe.occasions.map(el=>{
       if (el) {  return " - " + el } 
   })}
   </div>

   <div>{ID_Recipe.dishTypes ? "Dish Types:" : "" } {ID_Recipe.dishTypes} </div>

   <div>Time: {ID_Recipe.readyInMinutes} min <i class='bx bxs-time-five' ></i></div>
   <div>Servingss:
        {ID_Recipe.servings}   { [...Array(ID_Recipe.servings)].map((el) => <i class='bx bxs-wine'></i>) }
   </div>
                </div>


                <div class="panel" id="one-panel">
                    <div className="container_ingredients">
                        {ID_Recipe.analyzedInstructions && ID_Recipe.analyzedInstructions[0] ? ID_Recipe.analyzedInstructions[0].steps[0].ingredients.map(el => {
                            return <div>  <div>{el.name}</div> <img className="img_ingredient" src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} alt="" /> </div>
                        }) : ""}
                    </div>
                </div>

                <div class="panel" id="two-panel">
                    <div className="container_equipments">
                        {ID_Recipe.analyzedInstructions && ID_Recipe.analyzedInstructions[0] ? ID_Recipe.analyzedInstructions[0].steps[0].equipment.map(el => {
                            return <div>  <div>{el.name}</div> <img className="img_ingredient" src={`https://spoonacular.com/cdn/equipment_100x100/${el.image}`} alt="" /> </div>
                        }) : ""}
                    </div>
                </div>

                <div class="panel" id="three-panel">
                    {ID_Recipe.steps ? <div>{ID_Recipe.steps}</div> : ""}
                    {ID_Recipe.analyzedInstructions && ID_Recipe.analyzedInstructions[0] ? <div>{ID_Recipe.analyzedInstructions[0].steps[0].step}</div> : ""}
                </div>
            </div>

        </div>


            {/* <div>{ ID_Recipe.analyzedInstructions[0] ? "INSTRUCTIONS FOR PREPARING: " : ""}

            <div>{ ID_Recipe.analyzedInstructions[0] ? "Ingredients: " : ""}</div>
            <div className="container_ingredients">
            {ID_Recipe.analyzedInstructions[0] ? ID_Recipe.analyzedInstructions[0].steps[0].ingredients.map(el=>{
                return <div>  <div>{el.name}</div> <img className="img_ingredient" src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} alt=""  /> </div>}): ""}
           </div>
           
            <div>{ ID_Recipe.analyzedInstructions[0] ? "Equipments: " : ""}</div>
            <div className="container_equipments">  
            {ID_Recipe.analyzedInstructions[0] ? ID_Recipe.analyzedInstructions[0].steps[0].equipment.map(el=>{
                return <div>  <div>{el.name}</div> <img className="img_ingredient" src={`https://spoonacular.com/cdn/equipment_100x100/${el.image}`} alt=""  /> </div>}): ""}
           </div>

            <div>{ ID_Recipe.analyzedInstructions[0] ? "Steps: " : ""}</div>

            {ID_Recipe.analyzedInstructions[0] ? <div>{ID_Recipe.analyzedInstructions[0].steps[0].step}</div> : ""}
            </div> */}
        </div>








    </div>
}

const mapStateToProps = (state) => {
    return {
        Recipe_Detailed: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailRecipe: Recipe_Detailed => {
            dispatch(getDetailRecipe(Recipe_Detailed))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail_Recipe)
