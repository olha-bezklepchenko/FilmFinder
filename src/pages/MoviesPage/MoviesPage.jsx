import { useSearchParams } from "react-router-dom";
import { getSearchingMovie } from "../../servicies/tmdb-api";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useState, useEffect } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!query) {
      return;
    }
    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setMovies([]);
        const data = await getSearchingMovie(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      setSearchParams({});
      setMovies([]);
      return;
    }
    setSearchParams({ query: newQuery, page: 1 });
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          title="Something went wrong..."
          message=" We couldn't load the movies. Please check your internet connection
        or try again later."
        />
      )}
      {movies?.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        query &&
        !isLoading && (
          <ErrorMessage
            title="Unfortunately"
            message="There are no movies to display."
          />
        )
      )}
    </div>
  );
};

export default MoviesPage;
