// import './Link.css';
//
// import React from "react";
//
// class Link extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.setState({endpoint: props.endpoint})
//     }
//
//     render() {
//         return (
//
//         );
//     }
// }

function Link(props) {
    return <a onclick data-endpoint={props.endpoint}>{props.label}</a>
}