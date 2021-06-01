import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// ! COMPONENTS
import Navbar from "../Navbar/Navbar";
import Home from "../../Pages/Home/Home";
import Recipes from "../../Pages/Recipes/Recipes";
import Add_Recipe from '../../Pages/Add_Recipe/Add_Recipe'
import My_Recipes from '../../Pages/My_Recipes/My_Recipes'
import Detail_Recipe from '../../Pages/Detail_Recipe/Detail_Recipe'

import Diets from "../../Pages/Diets/Diets";
import Add_Diet from '../../Pages/Add_Diet/Add_Diet'
import My_Diets from '../../Pages/My_Diets/My_Diets'
import About from "../../Pages/About/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/new_recipe" component={Add_Recipe} />
          <Route exact path="/recipes/my_recipes" component={My_Recipes} />
          <Route exact path="/recipes/information/:id" component={Detail_Recipe} />

          <Route exact path="/diets" component={Diets} />
          <Route exact path="/diets/new_diet" component={Add_Diet} />
          <Route exact path="/diets/my_diets" component={My_Diets} />
          <Route exact path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
