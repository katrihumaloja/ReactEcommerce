import { Link } from "react-router-dom"
import "./../styles/Navbar.css"
import "font-awesome/css/font-awesome.min.css";

function Navbar() {
    return (
        <nav>
            <div className="nav-links">
                <Link to="/">Verkkokauppa</Link>
                <Link to="/products">Tuotteet</Link>
            </div>
            <div>
                <Link to="/cart" className="cart-icon">
                    <i className="fa fa-shopping-cart"></i>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar