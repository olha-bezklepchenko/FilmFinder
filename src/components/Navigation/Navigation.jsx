import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { RiMovie2Fill } from "react-icons/ri";

const Navigation = () => {
  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <div className={css.logo}>
          <RiMovie2Fill size="40px" color="#19042b" />
          <p className={css.logoName}>FilmFinder</p>
        </div>
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
