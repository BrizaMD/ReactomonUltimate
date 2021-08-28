import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import PokemonsList from "./components/PokemonsList";
import Home from "./components/Home";
import Types from "./components/Types";
import PokemonDetail from "./components/PokemonDetail";

const App = () => {
  return (
    <div className="App">
        <Home/>
        <Router>
            <Navbar/>
            <Switch>
                <Route title="Reactomon Ultimate" path="/pokemons" exact>
                    <PokemonsList />
                </Route>
                <Route title="Reactomon Ultimate" path="/pokemons/:id" render={(props) => <PokemonDetail {...props} />} exact />
                <Route title="Reactomon Ultimate" path="/types" exact>
                    <Types />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
