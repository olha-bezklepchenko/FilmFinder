import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "../MovieCast/MovieCast.module.css";

import { getMovieCast } from "../../servicies/tmdb-api";
const defaultImg =
  "https://dummyimage.com/400x600/c2b8c7/40065e.jpg&text=No+photo";

const MovieCrew = () => {
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  const firstCrewRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieCrew = async () => {
      try {
        setIsLoading(true);
        const movieCrew = await getMovieCast(movieId);
        setCrew(movieCrew.crew);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCrew();
  }, [movieId]);

  useEffect(() => {
    if (crew.length > 0 && firstCrewRef.current) {
      const itemHeight = firstCrewRef.current.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2,
        behavior: "smooth",
      });
    }
  }, [crew]);

  const importantJobs = [
    "Director",
    "Producer",
    "Writer",
    "Editor",
    "Director of Photography",
    "Original Music Composer",
    "Production Design",
    "Casting Director",
    "Visual Effects Editor",
    "Sound Designer",
    "Costume Design",
  ];
  const filteredCrew = crew
    .filter((person) => importantJobs.includes(person.job))
    .sort((a, b) => {
      const aJobIndex = importantJobs.indexOf(a.job);
      const bJobIndex = importantJobs.indexOf(b.job);
      return aJobIndex - bJobIndex;
    });

  const crewPersons = {};

  filteredCrew.forEach(({ id, name, job, profile_path }) => {
    if (crewPersons[name]) {
      crewPersons[name].job.push(job);
    } else {
      crewPersons[name] = { id, name, job: [job], profile_path };
    }
  });

  const crewArray = Object.values(crewPersons);

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          title="Something went wrong..."
          message="Unable to load the cast details. Please check your internet connection
              or try again later."
        />
      )}
      {crew.length > 0 && (
        <ul className={css.list}>
          {crewArray.map((person, index) => (
            <li
              key={person.id}
              className={css.item}
              ref={index === 0 ? firstCrewRef : null}
            >
              <Link
                to={`/people/${person.id}-${formatNameForUrl(person.name)}`}
                state={location}
                className={css.itemLink}
              >
                <div className={css.imageWrapper}>
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
                        : defaultImg
                    }
                    alt={person.name}
                  />
                </div>
                <div className={css.infoWrapper}>
                  <h3 className={css.infoName}>{person.name}</h3>
                  <p className={css.infoAccent}>As</p>
                  <p className={css.infoText}>{person.job.join(", ")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {crew.length === 0 && !isLoading && !isError && (
        <p className={css.message}>No cast information available.</p>
      )}
    </>
  );
};

export default MovieCrew;
