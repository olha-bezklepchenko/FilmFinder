import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <ul className={css.list}>
      {movies?.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={css.itemLink}
          >
            <div className={css.wrapper}>
              <div className={css.posterWrapper}>
                <img
                  className={css.poster}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  alt="poster"
                />
              </div>
              <div className={css.info}>
                <h2 className={css.movieTitle}>{movie.title}</h2>

                <p className={css.movieText}>
                  <span className={css.movieAccent}>Raiting:</span>
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
