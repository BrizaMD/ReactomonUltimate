import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
            <div key={id} className={'gridItem'}>
                <img src={sprite} alt={'image of ' + name}/>
                <p>Name: {name}</p>
                <p>Type: {type}</p>
            </div>
        </Link>
    )
}

export default React.memo(Pokemon);