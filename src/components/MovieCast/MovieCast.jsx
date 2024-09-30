import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieCast.module.css";

import { getMovieCast } from "../../servicies/tmdb-api";
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+photo";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setIsLoading(true);
        const movieCast = await getMovieCast(movieId);
        setCast(movieCast);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

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
      {cast.length > 0 && (
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.item}>
              <div className={css.imageWrapper}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : defaultImg
                  }
                  alt={actor.name}
                  width="100"
                />
              </div>
              <div className={css.infoWrapper}>
                <h3 className={css.infoName}>{actor.name}</h3>
                <p className={css.infoAccent}>As</p>
                <p className={css.infoText}>
                  {actor.character ? actor.character : "Unknown"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cast.length === 0 && !isLoading && !isError && (
        <p className={css.message}>No cast information available.</p>
      )}
    </>
  );
};

export default MovieCast;
