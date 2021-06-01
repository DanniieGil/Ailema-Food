import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import './Recipes.css'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { getRecipes, getDiets } from '../../Redux/actions/recipeActions'
import { Icon } from '@iconify/react';
import iosBookOutline from '@iconify-icons/ion/ios-book-outline';
import clockIcon from '@iconify-icons/et/clock';

function Recipes({ recipes, diets, getRecipes }) {

    useEffect(() => {
    getRecipes();
    }, [])

    // ! ************ FILTERS FUNCTIONS ******************
    const [RecipeFiltered, setRecipeFiltered] = useState(recipes);

    function compareAZ(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase()
        let result = [];
        result = recipes.filter((data) => {
            return data.title.toLowerCase().indexOf(value) >= 0;
        }).sort(function (a, b) {
            return compareAZ(a.title, b.title);
        })
        setRecipeFiltered(result);
    }

    // ! SORTING ALPHABETICAL
    const sortAZ = (event) => {
        let value = event.target.value.toLowerCase()
        let result = [];
        result = RecipeFiltered.filter((data) => {
            return data.title.toLowerCase().indexOf(value) >= 0;
        }).sort(function (a, b) {
            return compareAZ(a.title, b.title);
        })
        setRecipeFiltered(result);
    }

    function compareZA(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a > b) ? -1 : (a < b) ? 1 : 0
    }

    const sortZA = (event) => {
        let value = event.target.value.toLowerCase()
        let result = [];
        result = RecipeFiltered.filter((data) => {
            return data.title.toLowerCase().indexOf(value) >= 0;
        }).sort(function (a, b) {
            return compareZA(a.title, b.title);
        })
        setRecipeFiltered(result)
    }

    // ! SORTING DIETS
    var Diets_Array = new Array();

    // ! ARRAY DIET CHECKED
    function GetSelected() {
        Diets_Array = []
        var tblinputs = document.getElementById("diets");
        var chks = tblinputs.getElementsByTagName("INPUT");
        for (var i = 0; i < chks.length; i++) { if (chks[i].checked) { Diets_Array.push(chks[i].value) } }
    };

    const onChange_diet = () => {
        GetSelected()
        var search_Bar = document.getElementById("search_bar");
        let result = []
        if (search_Bar.value.length != 0) {
            Diets_Array.map(el => {
                return RecipeFiltered.map((el2, index) => {
                    return el2.diets.indexOf(el) >= 0 ? result.push(RecipeFiltered[index]) : ""
                })
            })
        } else {
            Diets_Array.map(el => {
                return recipes.map((el2, index) => {
                    if (el2.diets[0] && el2.diets[0].name) {
                        return el2.diets[0].name.indexOf(el) >= 0 ? result.push(recipes[index]) : ""
                    } else {
                        return el2.diets.indexOf(el) >= 0 ? result.push(recipes[index]) : ""

                    }
                })
            })
        }
        setRecipeFiltered(result)
        if (result.length == 0) return setRecipeFiltered(recipes)
    }

    // ! SORTING HEALTHY SCORE
    const ScoreAZ = () => {
        let result = [];
        result = RecipeFiltered.slice().sort((a, b) => a.healthScore - b.healthScore);
        setRecipeFiltered(result)
    }

    const ScoreZA = () => {
        let result = [];
        result = RecipeFiltered.slice().sort((a, b) => b.healthScore - a.healthScore);
        setRecipeFiltered(result)
    }

    // ! ************ PAGINATION ******************
    const [pageNumber, setPageNumber] = useState(0);
    const recipesPerPage = 10
    const pagesVisited = pageNumber * recipesPerPage
    const displayRecipes = RecipeFiltered.slice(pagesVisited, pagesVisited + recipesPerPage).map((el, index) => {
        return (
            <Link to={`/recipes/information/${el.id}`}>
                <div className="card">
                    <div className="card_health" id={el.id}>{el.healthScore} </div>
                    <div className="card_body">
                        <img src={el.image} alt="" className="card_image" id={el.id} />
                        <div className="card_title" id={el.id}>{el.title}</div>

                        <div className="information_circle">
                            <div className="circle_data">
                                 <span class="value_circle"><Icon icon={clockIcon}/> {el.readyInMinutes}</span>
                                 <span className="title_circle"> Mins</span>
                            </div>
                            <div className="circle_data">
                                <span class="value_circle"><Icon icon={iosBookOutline}/> {el.servings}</span>
                                <span className="title_circle"> Servings</span>

                            </div>
                        </div>

                        <div className="card_diets" id={el.id}><b>Diets: </b>{el.diets.map(el => {
                            if (el.name) {
                                return " - " + el.name
                            } else {
                                return " - " + el
                            }
                        })}</div>
                    </div>
                    <button className="card_btn">View Recipe</button>

                </div>
            </Link>
        )
    })
    const pageCount = Math.ceil(RecipeFiltered.length / recipesPerPage)
    const changePage = ({ selected }) => { setPageNumber(selected) }

    // ! ********************** CONTENT ************************
    return <div className="content">



        <div className="searchRecipe">
            <label><b>Search:</b> </label>
            <input type="text" placeholder="search.." className="search_bar" id="search_bar" onChange={(event) => handleSearch(event)} />

            {/* // * FILTERS */}
            <b>Filter by Alphabetical:</b>
            <button className="btn_filter" onClick={sortAZ}>AZ</button>
            <button className="btn_filter" onClick={sortZA}>ZA</button>

            <b>Filter by Healthy:  </b>
            <button className="btn_filter" onClick={ScoreAZ}>higher to lower</button>
            <button className="btn_filter" onClick={ScoreZA}>lower to higher</button>

            <div class='radio-container_recipes' id="diets">

                <b>Filter by Diets:  </b>
                {diets.map((dietes, index) => {
                    return <div>
                        <input id={index} name="diets" type='checkbox' onChange={onChange_diet} value={dietes.name} />
                        <label htmlFor={index}>{dietes.name}</label>
                    </div>
                })
                }



            </div>
        </div>

        <div className="cards_container_recipe">
            {displayRecipes}
        </div>
        <div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)