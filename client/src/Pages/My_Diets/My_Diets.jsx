import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Recipes/Recipes.css'
import { getRecipes, getDiets } from '../../Redux/actions/recipeActions'
import { connect } from 'react-redux';
import Notification from '../../Components/Notification/Notification'



function My_Diets({ getDiets }) {

    useEffect(() => {
        Get_Diets()
    }, [])

    const [list_diets, setlist_diets] = useState("")

    //  ! GET ALL_DIETS 
    const Get_Diets = () => {
        axios.get(`http://localhost:3001/diets`)
            .then(res => {
                setlist_diets(res.data)
                getDiets()
            })
            .catch(error => console.log(error))
    }

    //  ! POST DIETS 
    const Post_Diet = () => {
        const new_Diet = { "name": document.getElementsByClassName("name_new_diet")[0].value, "image": document.getElementsByClassName("image_new_diet")[0].value }
        axios.post(`http://localhost:3001/diets`, new_Diet)
            .then(res => { Get_Diets() })
            .catch(error => console.log(error))
    }

    //  ! DELETE DIET
    const Delete_Diet = e => {
        e.preventDefault();
        axios.delete(`http://localhost:3001/diets/${e.target.value}`)
            .then(res => {
                Get_Diets();
                getDiets();
                Notification("¡Recipe was DELETED SUCECEFULLY!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    // ! CONTENT PAGE
    return <div className="content">
        <h1>Diets</h1>
        <div>
            <h3>Add New Diet</h3>
            <div>
                <input className="name_new_diet" placeholder="Name new diet" type="text" />
                <input className="image_new_diet" placeholder="Url imagen of diet" type="text" value="https://www.hola.com/imagenes/estar-bien/20200522168267/razones-tener-hambre-siempre-gt/0-826-937/hambre-t.jpg"/>
                <button onClick={Post_Diet}>Add</button>
            </div>
        </div>
        <div className="cards_container_myrecipes">
            {list_diets && list_diets.map(el => {
                if (el.id.length === 1) {
                    return <div className="card">
                        <img src={el.image} className="card_image" alt="other" srcset="" />
                        <div id={el.id} className="card_title">{el.name.toUpperCase()}</div>
                    </div>
                } else {
                    return <div className="card">
                        <img src={el.image} className="card_image" alt="other" srcset="" />
                        <div id={el.id} className="card_title">{el.name.toUpperCase()} </div>
                        <button className="card_btn" value={el.id} onClick={Delete_Diet}>Delete</button>
                    </div>
                }
            })}
        </div>
   
    </div>
}

//  ! REDUX
const mapStateToProps = (stateRecipe, stateDiet) => {
    return {
        recipes: stateRecipe.recipes,
        diets: stateDiet.diets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDiets: diets => {
            dispatch(getDiets(diets))
        },
        getRecipes: recipes => {
            dispatch(getRecipes(recipes))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(My_Diets)