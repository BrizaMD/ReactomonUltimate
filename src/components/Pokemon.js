import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Pokemon = (props) => {
    const [name] = useState(props.name);
    const [detailsUrl] = useState(props.url);
    const [sprite, setSprite] = useState('');
    const [id, setId] = useState(0);
    const [type, setType] = useState('');

    useEffect(() => {
        axios.get(detailsUrl)
            .then(res => {
                setSprite(res.data.sprites.other['official-artwork'].front_default);
                setId(res.data.id);
                setType(res.data.types.map(type => type.type.name + ' '))
            })
    }, [detailsUrl]);

    return (
        <Link key={id} to={`/pokemons/${id}`}>
            <GridItem key={id} className={'gridItem'}>
                <img src={sprite} alt={'image of ' + name}/>
                <p>Name: {name}</p>
                <p>Type: {type}</p>
            </GridItem>
        </Link>
    )
}

export default React.memo(Pokemon);


const GridItem = styled.div`
  text-transform: capitalize;
  border: 2px solid rgba(240,240,240, 0.8);
  padding: 20px;
  max-height: 200px;
  
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
      position: relative;
    }
  }
`;