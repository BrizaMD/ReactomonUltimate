import axios from "axios";
import React, {useEffect, useState} from "react";
import Pokemon from "./Pokemon";
import styled from "styled-components";

const PokemonsList = () => {
    const firstUrl =  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
    const [pokemons, setPokemons] = useState([]);
    const [prev, setPrev] = useState('');
    const [next, setNext] = useState('');

    useEffect(() => {
        axios.get(firstUrl)
            .then(res => {
                setPokemons(res.data.results);
                setPrev(res.data.previous);
                setNext(res.data.next);

            })
    }, [firstUrl]);

    const getPokemons = (currentUrl) => {
        axios.get(currentUrl)
            .then( async resCurrent => {
                await setPokemons(resCurrent.data.results);
                await setPrev(resCurrent.data.previous);
                await setNext(resCurrent.data.next);
            });
    };


    return (
            <GridContainer id='gridContainer'>
                {pokemons.map(pokemon => <Pokemon url={pokemon.url} name={pokemon.name} key={pokemon.name}/>)}
                <NavButtonContainer id='buttonsContainer'>
                    {prev === '' ? (<NavButton id='prev'><p>Prev</p></NavButton>) : <NavButton id='prev' onClick={() => getPokemons(prev)}><p>Prev</p></NavButton>}
                    {next === '' ? (<NavButton id='next'><p>Next</p></NavButton>) : <NavButton id='next' onClick={() => getPokemons(next)}><p>Next</p></NavButton>}
                </NavButtonContainer>
            </GridContainer>
            )
}

export default PokemonsList;


export const GridContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  padding: 5px;
  border: 1px solid rgba(240,240,240, 0.8);
  width: 50%;
  height: 100%;
`;

const NavButton = styled.div`
  height: 30px;
  margin: auto;
  border: 2px solid rgba(240,240,240, 0.8);
  padding: 20px;
  :hover {
    cursor: pointer;
  }
  p{
    margin: auto;
  }
`;

const NavButtonContainer = styled.div`
  color: rgba(238,21,21, 1);
  display: flex;
  justify-content: space-evenly;
`;