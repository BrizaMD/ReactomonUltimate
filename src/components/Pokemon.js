import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Pokemon = (props) => {
    const [name] = useState(props.name);
    const [detailsUrl] = useState(props.url);
    const [sprite, setSprite] = useState('');
    const [id, setId] = useState(0);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get(detailsUrl)
            .then(res => {
                setSprite(res.data.sprites.other['official-artwork'].front_default);
                setId(res.data.id);
                setTypes(res.data.types);
            })
    }, [detailsUrl]);

    return (
        <Link key={id} to={`/pokemons/${id}`}>
            <GridItem key={id} className={'gridItem'}>
                <img src={sprite} alt={'image of ' + name}/>
                <p>Name:<br/>{name}</p>
                <div><span>Type:</span><br/>
                    {types.map(type => (
                        <TypeSpan color={type.type.name} key={type.type.name}>{type.type.name}<br/></TypeSpan>
                    ))}
                </div>
            </GridItem>
        </Link>
    )
}

export default React.memo(Pokemon);


const GridItem = styled.div`
  text-transform: capitalize;
  border: ${(props) => props.theme.border};
  padding: 20px;
  height: 150px;
  font-family: "Flexo-Demi",arial,sans-serif;
  font-size: 15px;
  background-color: ${(props) => props.theme.backgroundColor};

  div, p{
    color: ${(props) => props.theme.text};
  }
  
 span {
   color: red;
   font-weight: bold;
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
        case "shadow":
            return "#180000";
        case "unknown":
            return "#094400";
        default:
            return "#fff";
    }
};