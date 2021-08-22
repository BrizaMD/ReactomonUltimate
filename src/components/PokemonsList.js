import axios from "axios";
import React from "react";
import Pokemon from "./Pokemon";

class PokemonsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {startUrl: props.startUrl, fullResult: [], pokemons: []};
    }

    componentDidMount() {
        axios.get(this.state.startUrl)
            .then(res => {
                const temp = res.data;
                this.setState({fullResult: temp, pokemons: temp.results});
            })
    }

    render() {
        let elements = this.state.pokemons.map(p => <Pokemon url={p.url} name={p.name}/>);

        return <div id='gridContainer'>{elements}</div>;
    }
}

export default PokemonsList;