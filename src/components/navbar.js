import './navbar.css';
import React from "react";
import {
    Link
} from "react-router-dom";


const Navbar = () => {
    return(
        <div className="navbar">
            <ul>
                <li><Link to="/pokemons">Pokemons</Link></li>
                <li><Link to="/types">Types</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;