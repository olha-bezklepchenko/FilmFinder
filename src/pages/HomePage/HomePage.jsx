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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Section>
        <Container>
          <h1 className={css.title}>Daily Movie Trends</h1>
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
