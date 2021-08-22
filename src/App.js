import './App.css';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import axios from 'axios';

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name, detailsUrl: props.url, sprite: ''};
    }

    componentDidMount() {
        axios.get(this.state.detailsUrl)
            .then(res => {
                const temp = res.data;
                this.setState({sprite: temp.sprites.front_default});
            })
    }

    render() {
        return <img src={this.state.sprite} alt={'image of ' + this.state.name}/>;
    }
}

class Pokemons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fullResult: [], pokemons: []};
    }

    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(res => {
                const temp = res.data;
                this.setState({fullResult: temp, pokemons: temp.results});
            })
    }

    render() {
        console.log(this.state.pokemons);
        let elements = this.state.pokemons.map(p => <Pokemon url={p.url} name={p.name}/>);
        // <div className='gridItem'>Name: {p.name} <br/> Url: {p.url} </div>
        return <div id='gridContainer'>{elements}</div>;
    }
}



function Home() {
    return <h1>Welcome to Reactomon Ultimate!</h1>;
}

function Types() {
    return <h1>List by Types</h1>;
}

function App() {
  return (

    <div className="App">
        <Home/>
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/pokemons">
                    <Pokemons />
                </Route>
                <Route path="/types">
                    <Types />
                </Route>
            </Switch>
        </Router>


    </div>
  );
}

export default App;
