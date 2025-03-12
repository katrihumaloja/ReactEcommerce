import { Link } from "react-router-dom"
import "./../styles/Navbar.css"
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">The Cozy Corner</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Tuotteet</Link>
                        </li>
                    </ul>
                    <Link className="cart-icon" to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar