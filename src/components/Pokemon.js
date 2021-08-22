import axios from "axios";
import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            detailsUrl: props.url,
            sprite: '',
            id: 0,
        };
    }

    componentDidMount() {
        axios.get(this.state.detailsUrl)
            .then(res => {
                const pokeData = res.data;
                this.setState({
                    sprite: pokeData.sprites.front_default,
                    id: pokeData.id,
                });
            })
    }

    render() {
        return <div key={this.state.id} className={'gridItem'} onClick={this.handleClick.bind(this)}>
        <img src={this.state.sprite} alt={'image of ' + this.state.name}/>
            <p>Name: {this.state.name}</p>
        </div>;
    }

    handleClick() {
        alert("im getting clicked boiiiii " + this.state.name);
    }
}

export default Pokemon;