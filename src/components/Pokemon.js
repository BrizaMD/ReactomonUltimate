import axios from "axios";
import React, {useEffect, useState} from "react";

const Pokemon = (props) => {
    const [name] = useState(props.name);
    const [detailsUrl] = useState(props.url);
    const [sprite, setSprite] = useState('');
    const [id, setId] = useState(0);
    const [details, setDetails] = useState({});
    const [type, setType] = useState('');

    useEffect(() => {
        axios.get(detailsUrl)
            .then(res => {
                setDetails(res.data);
                setSprite(res.data.sprites.other.dream_world.front_default);
                setId(res.data.id);
                setType(res.data.types.map(type => type.type.name + ' '))
            })
    }, []);

    // folyt köv handle click

    return (
        <div key={id} className={'gridItem'}>
            <img src={sprite} alt={'image of ' + name}/>
            <p>Name: {name}</p>
            <p>Type: {type}</p>
        </div>
    )
}

export default React.memo(Pokemon);