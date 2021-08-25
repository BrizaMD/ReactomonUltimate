import {useEffect, useState} from "react";
import axios from "axios";


const PokemonDetail = (props) => {
    const id = props.match.params.id;
    const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState({
        id: null,
        name: null,
        sprite: '',
        abilities: [],
        types: [],

        experience: null,
        height: null,
        weight: null,

        stats: [],
    });

    useEffect(() => {
        axios.get(detailsUrl)
            .then(res => {
                setPokemon({
                    id: res.data.id,
                    name: res.data.name,
                    sprite: res.data.sprites.other["official-artwork"].front_default,
                    abilities: res.data.abilities,
                    types: res.data.types,

                    experience: res.data.base_experience,
                    height: res.data.height,
                    weight: res.data.weight,

                    stats: res.data.stats,
                })
            });
    }, []);

        return (
            <div id='detailsContainer' key={id}>
                <h1>{pokemon.name}</h1>
                <div>
                    <img src={pokemon.sprite} alt={pokemon.name}/>
                </div>
            </div>
        );


}

export default PokemonDetail;