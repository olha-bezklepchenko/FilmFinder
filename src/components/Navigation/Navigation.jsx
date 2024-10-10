import { Link, NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { RiMovie2Fill } from "react-icons/ri";
import SwitcherTheme from "../SwitcherTheme/SwitcherTheme";

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <Link to="/" className={css.logo}>
          <RiMovie2Fill className={css.logoIcon} />
          <p className={css.logoName}>FilmFinder</p>
        </Link>
        <SwitcherTheme />
        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
