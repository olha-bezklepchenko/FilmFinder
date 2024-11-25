import { Link, useLocation } from "react-router-dom";
import css from "./PeopleList.module.css";

const defaultImg =
  "https://dummyimage.com/400x600/c2b8c7/40065e.jpg&text=No+photo";

const PeopleList = ({ persons }) => {
  const location = useLocation();

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      <ul className={css.list}>
        {persons?.map((person) => (
          <li key={person.id} className={css.item}>
            <Link
              to={`/people/${person.id}-${formatNameForUrl(person.name)}`}
              state={location}
              className={css.itemLink}
            >
              <div className={css.wrapper}>
                <div className={css.photoWrapper}>
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

                  {person.known_for_department ? (
                    <p className={css.infoText}>
                      <span className={css.infoAccent}> Known for:</span>
                      {person.known_for_department}
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PeopleList;
