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
        species: null,
        description: null,
        weaknesses: [],
    });
    const [descriptionText, setDescriptionText] = useState('');
    const [allWeaknesses, setAllWeaknesses] = useState(new Set());
    const [stats, setStats] = useState({
        hp: null,
        attack: null,
        defense: null,
        speed: null
    });

    useEffect(() => {
         axios.get(detailsUrl)
            .then( async res => {
                await setPokemon({
                    id: res.data.id,
                    name: res.data.name,
                    sprite: res.data.sprites.other["official-artwork"].front_default,
                    abilities: res.data.abilities,
                    types: res.data.types,
                    experience: res.data.base_experience,
                    height: res.data.height,
                    weight: res.data.weight,
                    species: res.data.species.url,
                    stats: res.data.stats,
                    description: descriptionResult(res.data.species.url),
                    weaknessesGetter: res.data.types.map(type => getAllWeaknesses(type.type.url)),
                })
            });
        setUpStats(pokemon.stats);
    }, [detailsUrl, pokemon.species]);

    function setUpStats(statBlock){
        let hp = 0;
        let attack = 0;
        let defense = 0;
        let speed = 0;
        for (let stat of statBlock){
            let statNumber = stat.base_stat;
            let statName = stat.stat.name;
            switch (statName){
                case 'hp':
                    hp = statNumber;
                    break;
                case 'attack':
                    attack = statNumber;
                    break;
                case 'defense':
                    defense = statNumber;
                    break;
                case 'speed':
                    speed = statNumber;
                    break;
                default:
                    break;
            }
        }
        setStats({
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed
        })
    }

    async function descriptionResult(url) {
        let response;
        await axios.get(url)
            .then(res => {
                response = res.data;
            });
        let returnString = response.flavor_text_entries[0].flavor_text.toString();
        setDescriptionText(returnString);
        return returnString;
    }

    async function getAllWeaknesses(url) {
        let response;
        await axios.get(url)
            .then(res => {
                response = res.data;
            });
        let weaknesses = await response.damage_relations.double_damage_from;
        let namesOnly = weaknesses.map(weakness => weakness.name);
        for (let name of namesOnly){
            setAllWeaknesses(previousState => new Set(previousState.add(name)))
        }
        return allWeaknesses;
    }

    return (
            <DetailsGridContainer key={id}>
                <div className='header'><h2>{pokemon.name}</h2></div>
                <div className='picture'>
                    <img src={pokemon.sprite} alt={pokemon.name}/>
                </div>
                <div className='description'><strong>Description:</strong> {descriptionText}
                </div>
                <div className='stats'>{
                    <Stats>
                        <h4>Stats for <span>{pokemon.name}</span>:</h4>
                        <div>Health: {stats.hp}</div>
                        <div>Attack: {stats.attack}</div>
                        <div>Defense: {stats.defense}</div>
                        <div>Speed: {stats.speed}</div>
                    </Stats>
                }</div>
                <div className='type'>
                    <h4>Type:</h4>
                    {pokemon.types.map((type, index) => (
                        <TypeSpan color={type.type.name} key={index}>{type.type.name}</TypeSpan>
                    ))}
                </div>
                <div className='weaknesses'>
                    <h4>Weaknesses: </h4>
                    {Array.from(allWeaknesses).map((weakness) => (
                        <TypeSpan color={weakness} key={weakness}>{weakness}</TypeSpan>
                    ))}
                </div>
            </DetailsGridContainer>
        );


}

export default PokemonDetail;

const Stats = styled.div`
  color: aquamarine;
`;

const DetailsGridContainer = styled.div`

  .header {
    grid-area: header;
    text-transform: capitalize;
  }
  .picture {
    grid-area: picture;
  }
  .description {
    grid-area: description;
    text-align: left;
  }
  .stats {
    grid-area: stats;
  }
  .type {
    grid-area: type;
    text-transform: capitalize;
  }
  .weaknesses {
    grid-area: weaknesses;
  }

  text-align: left;
  background-color: #383737;
  margin: auto;
  display: grid;
  grid-template-areas:
    'header header header header header'
    'picture picture description description description'
    'picture picture type type type '
    'picture picture type type type '
    'stats stats weaknesses weaknesses weaknesses '
    'stats stats weaknesses weaknesses weaknesses ';
  grid-gap: 5px;
  padding: 5px;
  border: 1px solid rgba(240, 240, 240, 0.8);
  width: 50%;
  height: 100%;
  

  div {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
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