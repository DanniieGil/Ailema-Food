import React from 'react';
import { connect } from 'react-redux';
import './Diets.css'

function Diets(props) {
    return <div className="content">
        <h1>Diets Definitions</h1>
        <div className="columns">
            <div className="content_diets">
                <div className="diet_unit">
                    <p className="diet_title">Gluten Free</p>
                    <p className="diet_description">Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Ketogenic</p>
                    <p className="diet_description">The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Vegetarian</p>
                    <p className="diet_description">No ingredients may contain meat or meat by-products, such as bones or gelatin..</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Lacto-Vegetarian</p>
                    <p className="diet_description">All ingredients must be vegetarian and none of the ingredients can be or contain egg.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Ovo-Vegetarian</p>
                    <p className="diet_description">All ingredients must be vegetarian and none of the ingredients can be or contain dairy.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Vegan</p>
                    <p className="diet_description">No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Pescetarian</p>
                    <p className="diet_description">Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Paleo</p>
                    <p className="diet_description">Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Primal</p>
                    <p className="diet_description">Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.</p>
                </div>
                <div className="diet_unit">
                    <p className="diet_title">Whole30</p>
                    <p className="diet_description">Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.</p>
                </div>
            </div>
        <div className="content_image"><img src="https://spoonacular.com/application/frontend/images/academy/diet-infographic.png" alt="" srcset="" /></div>
        </div>
    </div>
}

const mapStateToProps = function (state) {
    return state
}
export default connect(mapStateToProps)(Diets);