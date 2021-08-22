import './navbar.css';

function Navbar() {
    return(
    <div className="navbar">
        <ul>
            <li><a href={"/"}>Home</a></li>
            <li><a href={"/pokemons"}>Pokémon</a></li>
            <li><a href={"/types"}>Types</a></li>
        </ul>
    </div>
    )
}

export default Navbar;