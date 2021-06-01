import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import './Home.css'

import { getRecipes, getDiets } from '../../Redux/actions/recipeActions'

function RecipeCards({ recipes, getRecipes, getDiets }) {

    useEffect(() => {
        getRecipes();
    }, [])

    useEffect(() => {
        getDiets()
    }, [])


    function imgSlider(refImg, refcolor) {
        document.querySelector('.starbucks').src = "./assets/images/" + refImg
        const circle = document.querySelector('.circle');
        circle.style.background = refcolor
    }

    return <div className="content">
        <section>
            <div className="circle"></div>
            <header>
                <Link to="/recipes"><img src="https://image.flaticon.com/icons/png/512/823/823214.png" className="logo" alt="" /></Link>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/recipes"><li>Menu</li></Link>
                    <Link to="/news"><li>What's New</li></Link>
                    <Link to="/contact"><li>Contact</li></Link>
                </ul>
            </header>
            <div className="content_home">
                <div className="textBox">
                    <h2>Are you hungry? <br></br>It's <span>AilemaFood</span></h2>
                    <p>Create your menu of personalized recipes for each occasion and moment. Share the recipes with your friends and loved ones. More than 5000 recipes to test your culinary talent. <strong>Inadle Food </strong> is the most complete cookbook in the world, and best of all, it is totally free. </p>
                    <a href="#">Learn More</a>
                </div>
                <div className="imgBox">
                    <img src="./assets/images/img1.png" alt="" className="starbucks" />
                </div>
                <ul className="thumb">
                    <li><img src="./assets/images/thumb1.png" alt="" onClick={() => imgSlider('img1.png', '#017143')} /></li>
                    <li><img src="./assets/images/thumb2.png" alt="" onClick={() => imgSlider('img2.png', '#2BAD7F')} /></li>
                    <li><img src="./assets/images/thumb3.png" alt="" onClick={() => imgSlider('img3.png', '#31A093')} /></li>
                </ul>
                <ul className="sci">
                    <li><a href="https://www.facebook.com/Nandoromer0/" className='bx bxl-facebook'></a></li>
                    <li><a href="https://github.com/dannieowk" className='bx bxl-github'></a></li>
                    <li><a href="https://www.instagram.com/danniegil/" className='bx bxl-instagram'></a></li>
                </ul>
            </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCards)