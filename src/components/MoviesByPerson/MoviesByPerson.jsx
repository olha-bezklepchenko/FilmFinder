import { useEffect, useState } from "react";
import { getPersonMovie } from "../../servicies/tmdb-api";
import MovieList from "../MovieList/MovieList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MoviesByPerson.module.css";

const MoviesByPerson = ({ personId, name }) => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const moviesByPerson = await getPersonMovie(personId);
        setMovies(moviesByPerson);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersonDetails();
  }, [personId]);

  return (
    <>
      <h1 className={css.title}>{`Movies width ${name}`}</h1>
      {isLoading && <Loader />}
      {isError && !isLoading && (
        <ErrorMessage
          title="Something went wrong..."
          message=" We couldn't load the movies. Please check your internet connection
            or try again later."
        />
      )}
      {movies?.length > 0 && <MovieList movies={movies} />}
      {movies?.length === 0 && !isLoading && !isError && (
        <p className={css.message}>
          {`No movies featuring ${name} are available.`}
        </p>
      )}
    </>
  );
};

export default MoviesByPerson;
