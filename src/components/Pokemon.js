import axios from "axios";
import React from "react";

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name, detailsUrl: props.url, sprite: ''};
    }

    componentDidMount() {
        axios.get(this.state.detailsUrl)
            .then(res => {
                const temp = res.data;
                this.setState({sprite: temp.sprites.front_default});
            })
    }

    render() {
        return <img src={this.state.sprite} alt={'image of ' + this.state.name}/>;
    }
}

export default Pokemon;