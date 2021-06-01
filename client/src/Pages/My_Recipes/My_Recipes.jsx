import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './My_Recipes.css'
import '../Add_Recipe/Add_Recipe.css'
import { getRecipes, getDiets } from '../../Redux/actions/recipeActions'

import Notification from '../../Components/Notification/Notification'

function My_Recipes({ recipes, getRecipes, getDiets }) {

    useEffect(() => {
        getRecipes()
    }, [])

    useEffect(() => {
        getDiets()
    }, [])
    
    const Delete_Recipe = e => {
        e.preventDefault();
        axios.delete(`http://localhost:3001/recipes/${e.target.value}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                getRecipes()
                Notification("¡Recipe was DELETED SUCECEFULLY!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    
    // ! ARRAY DIET CHECKED
    const Diets_Array = new Array();
    function GetSelected() {
        var tblinputs = document.getElementById("diets");
        var chks = tblinputs.getElementsByTagName("INPUT");
        for (var i = 0; i < chks.length; i++) { if (chks[i].checked) { Diets_Array.push(chks[i].value) } }
    };

   // ! ADD DIETs TO NEW RECIPE
   const AddDietsToRecipe =  async (Id_Recipe) =>{
    await Diets_Array.map(el=>{
          axios.post(`http://localhost:3001/recipes/${Id_Recipe}/diet/${el}`).then(res=>{
        console.log(res.data)
     }).catch(error => console.log(error))
    })
}

    const [auxiliar, setAuxiliar] = useState("")
    const [PUT_Recipe, setPUT_Recipe] = useState({
        "title": "",
        "image": "",
        "summary": "",
        "aggregateLikes": "",
        "healthScore": "",
        "readyInMinutes": '',
        "servings": "",
        "vegan": "",
        "vegetarian": "",
        "veryHealthy": "",
        "veryPopular": "",
        "steps": "",
    })

    const cleaning = {
        "title": "",
        "image": "",
        "summary": "",
        "aggregateLikes": "",
        "healthScore": "",
        "readyInMinutes": '',
        "servings": "",
        "vegan": "",
        "vegetarian": "",
        "veryHealthy": "",
        "veryPopular": "",
        "steps": "",
    }

    const Open_Form = (event) => {
        document.getElementById("myForm").style.display = "block";
        const aux = recipes.filter(el => {
            return el.id == event.target.value
        })
        setAuxiliar(aux)
        setPUT_Recipe(cleaning)
    }

    const Close_Form = () => {
        document.getElementById("myForm").style.display = "none";
    }

    const handleChange = e => {

    }


    const handleChanges = e => {
        setPUT_Recipe({ ...PUT_Recipe, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        GetSelected();
        axios.put(`http://localhost:3001/recipes/${auxiliar[0].id}`, PUT_Recipe)
            .then(res => {
                console.log(res);
                console.log(res.data);
                getRecipes();
                AddDietsToRecipe(res.data.id)
                getDiets();
                Notification("¡Recipe was UPDATED SUCECEFULLY!")
                Close_Form()
            })
            .catch(error => {
                console.log(error)
            })
    }


    return <div className="content">
        <h1>My Recipes</h1>
        <div className="cards_container_myrecipes">
            {
                recipes.filter(el1 => {
                    return el1.sourceUrl == undefined
                }).map(el2 => {
                    return <div className="card2">
                        <div className="card_health" id={el2.id}>{el2.healthScore} </div>
                        <div className="card_body">
                            <img src={el2.image} alt="" className="card_image" id={el2.id} />
                            <div className="card_title" id={el2.id}>{el2.title}</div>
                            <div className="card_diets2" id={el2.id}>Diets: {el2.diets.map(el => {
                                return " - " + el.name
                            })}</div>
                        </div>
                        <button className="card_btn_delete" value={el2.id} onClick={Delete_Recipe}>Delete</button>
                        <button className="card_btn_update" value={el2.id} onClick={(event) => Open_Form(event)}>Update</button>
                    </div>
                })
            }
        </div>

        <div class="form-popup " id="myForm">
            <form onSubmit={handleSubmit} class="form-container ">
                <header className="header_my_Recipe">
                    <h2>UPDATE RECIPE</h2>
                    <div className="container_data ">
                        <div className="set">
                            <div className='div-aux'>
                                <label for="title">Title</label>
                                <input type="text" name="title" placeholder="title..." value={PUT_Recipe && PUT_Recipe.title} onChange={handleChanges} required />
                            </div>
                            <div className='div-aux'>
                                <label for="image">Image</label>
                                <input type="text" name="image" placeholder="image..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.image} required />
                            </div>
                        </div>
                        <div className="set">
                            <div className='div-aux'>
                                <label for="summary">Summary</label>
                                <input type="text" name="summary" placeholder="summary..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.summary} required />
                            </div>
                            <div className='div-aux'>
                                <label for="aggregateLikes">Likes</label>
                                <input type="text" name="aggregateLikes" placeholder="likes..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.aggregateLikes} required />
                            </div>
                        </div>

                        <div className="set">
                            <div className='div-aux'>
                                <label for="healthScore">Healthy</label>
                                <input type="text" name="healthScore" placeholder="healthy..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.healthScore} required />
                            </div>
                            <div className='div-aux'>
                                <label for="readyInMinutes">Timing</label>
                                <input type="text" name="readyInMinutes" placeholder="timing..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.readyInMinutes} required />
                            </div>
                        </div>

                        <div className="set">
                            <div className='div-aux'>
                                <label for="servings">Servings</label>
                                <input type="text" name="servings" placeholder="servings..." onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.servings} required />
                            </div>
                        </div>
                        <table id="diets">
                        <div class='set'>
                            <div class='recipe-vegan'>
                                <label for='recipe-vegan'>Vegan?</label>
                                <div class='radio-container'>
                                    <input id='vegan-yes' name='vegan' type='radio' value={true} onChange={handleChanges} required />
                                    <label for='vegan-yes'>Yes</label>
                                    <input id='vegan-no' name='vegan' type='radio' value={false} onChange={handleChanges} required />
                                    <label for='vegan-no'>No</label>
                                </div>
                            </div>
                            <div class='recipe-vegetarian'>
                                <label for='recipe-vegetarian'>Vegetarian?</label>
                                <div class='radio-container'>
                                    <input id='vegetarian-yes' name='vegetarian' type='radio' value={true} onChange={handleChanges} required />
                                    <label for='vegetarian-yes'>Yes</label>
                                    <input id='vegetarian-no' name='vegetarian' type='radio' value={false} onChange={handleChanges} required />
                                    <label for='vegetarian-no'>No</label>
                                </div>
                            </div>

                            <div class='recipe-veryHealthy'>
                                <label for='recipe-veryHealthy'>Very-Healthy?</label>
                                <div class='radio-container'>
                                    <input id='healthy-yes' name='veryHealthy' type='radio' value={true} onChange={handleChanges} required />
                                    <label for='healthy-yes'>Yes</label>
                                    <input id='healthy-no' name='veryHealthy' type='radio' value={false} onChange={handleChanges} required />
                                    <label for='healthy-no'>No</label>
                                </div>
                            </div>
                            <div class='recipe-veryPopular'>
                                <label for='recipe-veryPopular'>Very-Popular?</label>
                                <div class='radio-container'>
                                    <input id='popular-yes' name='veryPopular' type='radio' value={true} onChange={handleChanges} required />
                                    <label for='popular-yes'>Yes</label>
                                    <input id='popular-no' name='veryPopular' type='radio' value={false} onChange={handleChanges} required />
                                    <label for='popular-no'>No</label>
                                </div>
                            </div>
                            
                        </div>
                        </table>
                        <div className="set">
                            <div className='div-aux'>
                                <label for="steps">Steps</label>
                                <input type="text" name="steps" onChange={handleChanges} value={PUT_Recipe && PUT_Recipe.steps} required />
                            </div>
                        </div>
                        <footer>
                            <div className="set">
                                <button type="submit" className="btn" id="subm">UPDATE</button>
                                <button type="button" className="btn cancel" id="cancel" onClick={Close_Form}>Close</button>
                            </div>
                        </footer>
                    </div>
    




                </header>
            </form>
        </div>


    </div >
}

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
        }, getDiets: diets => {
            dispatch(getRecipes(diets))
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(My_Recipes);