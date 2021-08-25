import axios from "axios";
import React, {useEffect, useState} from "react";
import Pokemon from "./Pokemon";

const PokemonsList = () => {
    const firstUrl =  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
    const [fullResult, setFullResult] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [prev, setPrev] = useState('');
    const [next, setNext] = useState('');

    useEffect(() => {
        axios.get(firstUrl)
            .then(res => {
                setFullResult(res.data);
                setPokemons(res.data.results);
                setPrev(res.data.previous);
                setNext(res.data.next);

            })
    }, [firstUrl]);

    const getPokemons = (currentUrl) => {
        axios.get(currentUrl)
            .then( async resCurrent => {
                await setFullResult(resCurrent.data);
                await setPokemons(resCurrent.data.results);
                await setPrev(resCurrent.data.previous);
                await setNext(resCurrent.data.next);
            });
    };


    return (
            <div id='gridContainer'>
                {pokemons.map(pokemon => <Pokemon url={pokemon.url} name={pokemon.name} key={pokemon.name}/>)}
                <div id='buttonsContainer'>
                    {prev === '' ? (<div id='prev'><p>Prev</p></div>) : <div id='prev' onClick={() => getPokemons(prev)}><p>Prev</p></div>}
                    {next === '' ? (<div id='next'><p>Next</p></div>) : <div id='next' onClick={() => getPokemons(next)}><p>Next</p></div>}
                </div>
            </div>
            )
}

export default PokemonsList;