import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const Types = () => {
    const firstEndpoint =  "https://pokeapi.co/api/v2/type";
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get(firstEndpoint)
            .then(res => {
                setTypes(res.data.results);
            })
    }, []);

    return (
        <GridContainer id='gridContainer'>
            {types.map(
                (type, index) => (
                    <GridItem className="gridItem" key={index} color={type.name}>
                        {type.name}
                    </GridItem>
                ))}
        </GridContainer>
    );
}

export default Types;

const GridContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 5px;
  padding: 5px;
  border: 1px solid rgba(240,240,240, 0.8);
  width: 50%;
  height: 100%;
`;

export const GridItem = styled.div`
  text-transform: capitalize;
  border: 2px solid rgba(240,240,240, 0.8);
  padding: 20px;
  height: 30px;
  font-family: "Flexo-Demi",arial,sans-serif;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  vertical-align: middle;
  background: ${({color}) => handleColorType(color)};

`;

export const handleColorType = color => {
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