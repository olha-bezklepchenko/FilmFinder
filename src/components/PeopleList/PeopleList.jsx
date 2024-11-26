import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import css from "./PeopleList.module.css";

const defaultImg =
  "https://dummyimage.com/400x600/c2b8c7/40065e.jpg&text=No+photo";

const PeopleList = ({
  people,
  isCast = false,
  isCrew = false,
  isScrollEnabled = false,
}) => {
  const location = useLocation();
  const firstPersonRef = useRef(null);

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    if (isScrollEnabled && people.length > 0 && firstPersonRef.current) {
      const itemHeight = firstPersonRef.current.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2,
        behavior: "smooth",
      });
    }
  }, [people, isScrollEnabled]);

  return (
    <>
      <ul className={css.list}>
        {people?.map((person, index) => (
          <li key={person.id} className={css.item}>
            <Link
              to={`/people/${person.id}-${formatNameForUrl(person.name)}`}
              state={location}
              ref={index === 0 && isScrollEnabled ? firstPersonRef : null}
              className={css.itemLink}
            >
              <div className={css.wrapper}>
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
                      : defaultImg
                  }
                  alt={person.name}
                  className={css.photo}
                />
              </div>
              <div className={css.info}>
                <h3 className={css.infoName}>{person.name}</h3>
                <p className={css.infoAccent}>
                  {isCast || isCrew ? "As" : "Known for:"}
                </p>

                <p className={css.infoText}>
                  {isCast && (person.character ? person.character : "Unknown")}
                  {isCrew && (person.job ? person.job.join(", ") : "Unknown")}
                  {!isCast &&
                    !isCrew &&
                    (person.known_for_department
                      ? person.known_for_department
                      : "Unknown")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PeopleList;
