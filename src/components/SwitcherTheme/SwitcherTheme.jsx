import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
// import { PiSunFill } from "react-icons/pi";
import { FaRegSun } from "react-icons/fa6";
import css from "./SwitcherTheme.module.css";

const SwitcherTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "light-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <button onClick={toggleTheme} className={css.btnSwitcher}>
        {theme === "dark" ? (
          <FaRegSun className={css.iconSun} />
        ) : (
          <BsFillMoonStarsFill className={css.iconMoon} />
        )}
      </button>
    </>
  );
};

export default SwitcherTheme;
