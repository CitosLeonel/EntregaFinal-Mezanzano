import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import styles from "./NavBar.module.css";
import logoImage from "../../assets/images/logo.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-success">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand" to="/">
          <img src={logoImage} alt="logo" className={styles["logo-img"]}/>
        </Link>

        <form className="d-flex mx-auto w-50" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Serch..."
            aria-label="Serch"
          />
          <button className="btn btn-outline-success" type="submit">
            Serch
          </button>
        </form>
        <Link to="/Cart">
          <CartWidget />
        </Link>
      </div>

      <div className="container-fluid d-flex justify-content-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to="/category/autoflower" className="nav-link">
              Autoflower
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/feminized" className="nav-link">
              Feminized
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/cbd" className="nav-link">
              CBD
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/regular" className="nav-link">
              Regular
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
