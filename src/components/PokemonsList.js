import axios from "axios";
import React from "react";
import Pokemon from "./Pokemon";

class PokemonsList extends React.Component {
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

export default PokemonsList;