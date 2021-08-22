import React from "react";
import axios from "axios";
import Pokemon from "./Pokemon";

class Types extends React.Component{
    constructor(props) {
        super(props);
        this.state = {startUrl: props.startUrl, types: []};
    }

    componentDidMount() {
        axios.get(this.state.startUrl)
            .then(res => {
                const temp = res.data;
                this.setState({types: temp.results});
            })
    }

    render() {
        let elements = this.state.types.map(p =>
            <div className="gridItem" url={p.url} name={p.name}>
                <p>{p.name}</p>
            </div>);

        return <div id='gridContainer'>{elements}</div>;
    }
}

export default Types;