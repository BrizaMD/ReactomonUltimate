import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {useState} from "react";
import PokemonsList from "./components/PokemonsList";
import Home from "./components/Home";
import Types from "./components/Types";
import PokemonDetail from "./components/PokemonDetail";
import { lightTheme, darkTheme, GlobalStyles } from "./context/Theme.js";
import {ThemeProvider} from "styled-components";
import styled from "styled-components";

const App = () => {
    const [theme, setTheme] = useState('dark');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

  return (
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <GlobalStyles />
        <div className="App">
            <ThemeButton onClick={themeToggler} theme={theme}>Switch Theme</ThemeButton>
            <Home theme={theme} />
            <Router>
                <Navbar theme={theme} setTheme={setTheme} />
                <Switch>
                    <Route title="Reactomon Ultimate" path="/pokemons" theme={theme} exact>
                        <PokemonsList theme={theme}  />
                    </Route>
                    <Route title="Reactomon Ultimate" path="/pokemons/:id" render={(props) => <PokemonDetail {...props} theme={theme}  />} exact />
                    <Route title="Reactomon Ultimate" path="/types" theme={theme}  exact>
                        <Types theme={theme}  />
                    </Route>
                </Switch>
            </Router>
        </div>
      </ThemeProvider>
  );
}

export default App;

const ThemeButton = styled.button`
  display: inline-block;
  padding: 15px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid black;
  border-radius: 15px;
  float: left;

  :active {
    transform: translateY(4px);
`;