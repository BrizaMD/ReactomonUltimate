import axios from "axios";
import React, {useEffect, useState} from "react";
import Pokemon from "./Pokemon";

const PokemonsList = () => {
    const firstEndpoint =  "https://pokeapi.co/api/v2/pokemon";
    const [fullResult, setFullResult] = useState([]);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get(firstEndpoint)
            .then(res => {
                setFullResult(res.data);
                setPokemons(res.data.results);
            })
    }, []);

    return (
            <div id='gridContainer'>
                {pokemons.map(pokemon => <Pokemon url={pokemon.url} name={pokemon.name}/>)}
            </div>
            )
}

export default PokemonsList;