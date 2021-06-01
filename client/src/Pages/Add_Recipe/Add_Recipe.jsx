import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux'
import './Add_Recipe.css'
import { getRecipes, getDiets } from '../../Redux/actions/recipeActions'

import Notification from '../../Components/Notification/Notification'

function Add_Recipe({ recipes, diets, getRecipes, getDiets }) {

    const Diets_Array = [];

    // ! ARRAY DIET CHECKED
    function GetSelected() {
        var tblinputs = document.getElementById("diets");
        var chks = tblinputs.getElementsByTagName("INPUT");
        for (var i = 0; i < chks.length; i++) { if (chks[i].checked) { Diets_Array.push(chks[i].value) } }
    };

    // ! STATE RECIPES
    const [recipe, setRecipe] = useState({
        title: "",
        image: "",
        summary: "",
        aggregateLikes: "",
        healthScore: "",
        readyInMinutes: '',
        servings: "",
        vegan: "",
        vegetarian: "",
        veryHealthy: "",
        veryPopular: "",
        steps: "",
    })

    // ! ADD DIETs TO NEW RECIPE
    const AddDietsToRecipe =  async (Id_Recipe) =>{
        await Diets_Array.map(el=>{
              axios.post(`http://localhost:3001/recipes/${Id_Recipe}/diet/${el}`).then(res=>{
            console.log(res.data)
         }).catch(error => console.log(error))
        })
    }

    // ! INPUT ONCHANGE
    const handleChange = e => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value })
    }

    // ! FORM SUBMIT
    const handleSubmit = async e => {
        e.preventDefault();
        GetSelected()
        await axios.post(`http://localhost:3001/recipes`, recipe)
            .then(res => {
                AddDietsToRecipe(res.data.id)
                getRecipes();                
                getDiets();
                Notification("¡Recipe was added SUCECEFULLY!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    // ! CONTENT PAGE
    return <div className="add_recipe content">
        <div class='signup-container'>
            <div class='left-container'>
                <h1>
                    <i class='bx bxs-food-menu'></i>
                        ADD RECIPE
                </h1>
                <div class='puppy'>
                    <img src='/assets/images/img1.png' alt="" />
                    <img src='/assets/images/img2.png' alt="" />
                    <img src='/assets/images/img3.png' alt="" />
                </div>
            </div>
            <div class='right-container'>
                <form onSubmit={handleSubmit}>
                    <header className="header_add_Recipe">
                        <h1>Add recipe to your collection!</h1>

                        {/* TITLE AND IMAGE */}
                        <div class='set'>
                            <div class='recipe-name'>
                                <label for='recipe-name'>Name</label>
                                <input id='recipe-name' placeholder="title..." type='text' name="title" onChange={handleChange} required />
                            </div>
                            <div class='recipe-name'>
                                <label for='recipe-upload'>Upload a photo <i class='bx bxs-camera'></i></label>
                                <input id='recipe-image' placeholder="image..." type='text' name="image" onChange={handleChange} required />
                            </div>
                        </div>

                        {/* SUMMARY AND LIKES */}
                        <div class='set'>
                            <div class='recipe-summary'>
                                <label for='recipe-summary'>Summary</label>
                                <input id='recipe-summary' placeholder="summary..." type='text' name="summary" onChange={handleChange} required />
                            </div>
                            <div class='recipe-aggregateLikes'>
                                <label for='recipe-aggregateLikes'>Likes</label>
                                <input id='recipe-aggregateLikes' placeholder='likes...' type='text' name="aggregateLikes" onChange={handleChange} required />
                            </div>
                        </div>

                        {/* DIETS AND HEALTHY */}
                        <div class='set'>
                            <div class='recipe-diets'>
                                <label for='diets'>Diets</label>
                                <table id="diets">
                                    <div class='radio-container'>
                                        {
                                            diets.map((dietes, index) => {
                                                return <div>
                                                    <input id={index} name="diets" type='checkbox' value={dietes.id} />
                                                    <label for={index}>{dietes.name}</label>
                                                </div>
                                            })
                                        }
                                    </div>
                                </table>
                            </div>
                            <div class='recipe-healthScore'>
                                <label for='recipe-healthScore'>Healthy</label>
                                <input id='recipe-healthScore' placeholder='healthy...' type='text' name="healthScore" onChange={handleChange} required />
                                {/* TIMING AND SERVINGS */}
                                <label for='recipe-readyInMinutes'>readyInMinutes</label>
                                <input id='recipe-readyInMinutes' placeholder="timing..." type='text' name="readyInMinutes" onChange={handleChange} required />

                                <label for='recipe-servings'>Servings</label>
                                <input id='recipe-servings' placeholder='servings...' type='text' name="servings" onChange={handleChange} required />

                            </div>

                        </div>

                        {/* VEGAN AND VEGETARIAN */}
                        <div class='set'>
                            <div class='recipe-vegan'>
                                <label for='recipe-vegan'>Vegan</label>
                                <div class='radio-container'>
                                    <input id='vegan-yes' name='vegan' type='radio' value={true} onChange={handleChange} required />
                                    <label for='vegan-yes'>Yes</label>
                                    <input id='vegan-no' name='vegan' type='radio' value={false} onChange={handleChange} required />
                                    <label for='vegan-no'>No</label>
                                </div>
                            </div>
                            <div class='recipe-vegetarian'>
                                <label for='recipe-vegetarian'>Vegetarian</label>
                                <div class='radio-container'>
                                    <input id='vegetarian-yes' name='vegetarian' type='radio' value={true} onChange={handleChange} required />
                                    <label for='vegetarian-yes'>Yes</label>
                                    <input id='vegetarian-no' name='vegetarian' type='radio' value={false} onChange={handleChange} required />
                                    <label for='vegetarian-no'>No</label>
                                </div>
                            </div>
                        </div>

                        {/* HEALTHY AND POPULAR */}
                        <div class='set'>
                            <div class='recipe-veryHealthy'>
                                <label for='recipe-veryHealthy'>Very Healthy</label>
                                <div class='radio-container'>
                                    <input id='healthy-yes' name='veryHealthy' type='radio' value={true} onChange={handleChange} required />
                                    <label for='healthy-yes'>Yes</label>
                                    <input id='healthy-no' name='veryHealthy' type='radio' value={false} onChange={handleChange} required />
                                    <label for='healthy-no'>No</label>
                                </div>
                            </div>
                            <div class='recipe-veryPopular'>
                                <label for='recipe-veryPopular'>Very Popular</label>
                                <div class='radio-container'>
                                    <input id='popular-yes' name='veryPopular' type='radio' value={true} onChange={handleChange} required />
                                    <label for='popular-yes'>Yes</label>
                                    <input id='popular-no' name='veryPopular' type='radio' value={false} onChange={handleChange} required />
                                    <label for='popular-no'>No</label>
                                </div>
                            </div>
                        </div>

                        {/* STEPS */}
                        <div class='recipe-steps'>
                            <label for='steps' >Steps  <i class='bx bx-plus-circle' ></i></label>
                            <input id='recipe-steps' placeholder='Steps' type='text' name="steps" onChange={handleChange} required />
                        </div>
                    </header>
                    <footer>
                        <div class='set'>
                            <button id='back'>Cancel</button>
                            <button type="submit" id='next'>Add!</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>


    </div>
}


// ! REDUX
const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        diets: state.diets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: recipes => {
            dispatch(getRecipes(recipes))
        },
        getDiets: diets => {
            dispatch(getDiets(diets))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add_Recipe)