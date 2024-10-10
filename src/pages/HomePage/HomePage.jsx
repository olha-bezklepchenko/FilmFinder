import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../servicies/tmdb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import { useState, useEffect } from "react";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [time, setTime] = useState("day");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const trendingMovies = await getTrendingMovies(time);
        setMovies(trendingMovies);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [time]);

  return (
    <>
      <Section>
        <Container>
          <div className={css.menu}>
            {time === "day" ? (
              <h1 className={css.title}>Daily Movie Trends</h1>
            ) : (
              <h1 className={css.title}>Weekly Movie Trends</h1>
            )}
            <button
              className={css.btn}
              onClick={() => setTime("day")}
              disabled={time === "day"}
            >
              Daily
            </button>
            <button
              className={css.btn}
              onClick={() => setTime("week")}
              disabled={time === "week"}
            >
              Weekly
            </button>
          </div>
          {isLoading && <Loader />}
          {isError && (
            <ErrorMessage
              title="Something went wrong..."
              message=" We couldn't load the movies. Please check your internet connection
              or try again later."
            />
          )}
          {movies?.length > 0 && <MovieList movies={movies} />}
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
