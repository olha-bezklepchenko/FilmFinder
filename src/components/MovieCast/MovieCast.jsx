import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieCast.module.css";

import { getMovieCast } from "../../servicies/tmdb-api";
import PeopleList from "../PeopleList/PeopleList.jsx";

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
        setCast(movieCast.cast);
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
        <PeopleList people={cast} isCast={true} isScrollEnabled={true} />
      )}
      {cast.length === 0 && !isLoading && !isError && (
        <p className={css.message}>No cast information available.</p>
      )}
    </>
  );
};

export default MovieCast;
