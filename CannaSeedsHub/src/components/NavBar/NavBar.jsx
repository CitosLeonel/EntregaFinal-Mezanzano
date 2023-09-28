import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import styles from "./NavBar.module.css";
import logoImage from "../../assets/images/logo.png";

const NavBar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-success ${styles["navBar"]}`}>
      <div className="container-fluid d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logoImage} alt="logo" className={styles["logoImg"]} />
        </Link>

        <div className="container-fluid d-flex justify-content-center">
          <ul className="nav nav-tabs nav-tabs">
            <li className={`nav-item ${styles["navItem"]}`}>
              <NavLink to="/category/autoflower" className="nav-link text-dark">
                Autoflower
              </NavLink>
            </li>
            <li className={`nav-item ${styles["navItem"]}`}>
              <NavLink to="/category/feminized" className="nav-link text-dark">
                Feminized
              </NavLink>
            </li>
            <li className={`nav-item ${styles["navItem"]}`}>
              <NavLink to="/category/cbd" className="nav-link text-dark">
                CBD
              </NavLink>
            </li>
            <li className={`nav-item ${styles["navItem"]}`}>
              <NavLink to="/category/regular" className="nav-link text-dark">
                Regular
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/Cart" className="ml-auto">
          <CartWidget />
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;
