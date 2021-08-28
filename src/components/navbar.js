import React from "react";
import {
    Link
} from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    return(
        <NavBarStyle className="navbar">
            <ul>
                <li><Link to="/pokemons">Pokemons</Link></li>
                <li><Link to="/types">Types</Link></li>
            </ul>
        </NavBarStyle>
    )
}

export default Navbar;

const NavBarStyle = styled.div`
  ul{
    list-style-type: none;
    margin: 5px;
    padding: 5px;
  }
  li {
    font-size: 20px;
    display: inline;
    margin: 10px;
  }
`;