import axios from "axios";
import React, {useEffect, useState} from "react";

const Pokemon = (props) => {
    const [name] = useState(props.name);
    const [detailsUrl] = useState(props.url);
    const [sprite, setSprite] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        axios.get(detailsUrl)
            .then(res => {
                setSprite(res.data.sprites.front_default);
                setId(res.data.id);
            })
    }, []);

    const handleClick = () => {
        alert("im getting clicked: " + name);
    }

    return (
        <div key={id} className={'gridItem'} onClick={handleClick}>
            <img src={sprite} alt={'image of ' + name}/>
            <p>Name: {name}</p>
        </div>
    )
}

export default React.memo(Pokemon);