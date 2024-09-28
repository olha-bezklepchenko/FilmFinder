import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              <div>
                <div>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : defaultImg
                    }
                    width={250}
                    alt="poster"
                  />
                </div>
                <div>
                  <h2>{movie.title}</h2>
                  <p>Year: {movie.release_date.slice(0, 4)}</p>
                  <p>Raiting:{movie.vote_average}</p>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
