import { useState, useEffect } from "react";
import css from "./ScrollTopBtn.module.css";
import { GrUpgrade } from "react-icons/gr";

const ScrollTopBtn = () => {
  const [visible, setVisible] = useState(false);
  const [isOnClick, setIsOnClick] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isOnClick) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOnClick]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
    setIsOnClick(true);
    setTimeout(() => setIsOnClick(false), 1000);
  };

  return (
    <>
      {visible && (
        <button type="button" className={css.scrollBtn} onClick={scrollToTop}>
          <GrUpgrade className={css.icon} />
        </button>
      )}
    </>
  );
};

export default ScrollTopBtn;
