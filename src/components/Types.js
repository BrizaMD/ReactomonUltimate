import React, {useEffect, useState} from "react";
import axios from "axios";

const Types = (props) => {
    const firstEndpoint =  "https://pokeapi.co/api/v2/type";
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.get(firstEndpoint)
            .then(res => {
                setTypes(res.data.results);
            })

    }, []);

    return (
        <div id='gridContainer'>
            {types.map(
                (type, index) => (
                    <div className="gridItem" url={type.url} name={type.name} key={index}>
                        <p>{type.name}</p>
                    </div>
                ))}
        </div>
    );
}

export default Types;