import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";


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
            <DetailsGridContainer key={id}>
                <div className='header'>{pokemon.name}</div>
                <div className='picture'>
                    <img src={pokemon.sprite} alt={pokemon.name}/>
                </div>
                <div className='description'>Placeholder for description</div>
                <div className='stats'>Placeholder for stats</div>
                <div className='type'>
                {pokemon.types.map(type => (
                    <TypeSpan color={type.type.name}>{type.type.name}</TypeSpan>
                ))}
                </div>
                <div className='weaknesses'>Placeholder for weaknesses</div>
            </DetailsGridContainer>
        );


}

export default PokemonDetail;


const DetailsGridContainer = styled.div`

  .header { grid-area: header; }
  .picture { grid-area: picture; }
  .description { grid-area: description; }
  .stats { grid-area: stats; }
  .type { grid-area: type; }
  .weaknesses { grid-area: weaknesses; }
  
  margin: auto;
  display: grid;
  grid-template-areas:
    'header header header header header'
    'picture picture description description description'
    'picture picture type type type '
    'picture picture weaknesses weaknesses weaknesses '
    'stats stats weaknesses weaknesses weaknesses ';
  grid-gap: 5px;
  padding: 5px;
  border: 1px solid rgba(240,240,240, 0.8);
  width: 50%;
  height: 100%;
  text-transform: capitalize;

  div {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
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

const GridItem = styled.div`
  text-transform: capitalize;
  border: 2px solid rgba(240,240,240, 0.8);
  padding: 20px;
  height: 150px;
  font-family: "Flexo-Demi",arial,sans-serif;
  font-size: 15px;

  p {
    color: rgba(238,21,21, 1);
  }
  
  :hover {
    cursor: pointer;
  }
  
  img {
    float: left;
    object-fit: contain;
    transition: transform .2s;
    max-height: 150px;
    :hover {
      transform: scale(1.2);
      
    }
  }
`;

const TypeSpan = styled.div`
  color: white;
  padding: 3px;
  margin: 1px;
  background: ${({color}) => handleColorType(color)};
`;

const handleColorType = color => {
    switch (color) {
        case "bug":
            return "#729f3f";
        case "dark":
            return "#707070";
        case "dragon":
            return "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)";
        case "electric":
            return "#eed535";
        case "fairy":
            return "#fdb9e9";
        case "fighting":
            return "#d56723";
        case "fire":
            return "#fd7d24";
        case "flying":
            return "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)";
        case "ghost":
            return "#7b62a3";
        case "grass":
            return "#9bcc50";
        case "ground":
            return "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)";
        case "ice":
            return "#51c4e7";
        case "normal":
            return "#a4acaf";
        case "poison":
            return "#b97fc9";
        case "psychic":
            return "#f366b9";
        case "rock":
            return "#a38c21";
        case "steel":
            return "#9eb7b8";
        case "water":
            return "#4592c4";
        default:
            return "#fff";
    }
};