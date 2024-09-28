import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useRef, useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { getMovieDetails } from "../../servicies/tmdb-api";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (isError || !movie) {
    return (
      <ErrorMessage
        title="Something went wrong..."
        message="Unable to load the movie details. Please try again later."
      />
    );
  }

  return (
    <div>
      <Link to={goBackRef.current}>Go back</Link>
      <div>
        <div>
          <div>
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
          </div>
          <div></div>
        </div>
      </div>

      <div>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
