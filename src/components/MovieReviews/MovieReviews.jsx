import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./MovieReviews.module.css";
import { getMovieReviews } from "../../servicies/tmdb-api";
import { FaRegCommentDots } from "react-icons/fa";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const firstReviewRef = useRef(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0 && firstReviewRef.current) {
      const itemHeight = firstReviewRef.current.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight,
        behavior: "smooth",
      });
    }
  }, [reviews]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          title="Something went wrong..."
          message="Unable to load the reviews. Please check your internet connection
              or try again later."
        />
      )}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review, index) => (
            <li
              key={review.id}
              className={css.item}
              ref={index === 0 ? firstReviewRef : null}
            >
              <div className={css.infoWrapper}>
                <FaRegCommentDots size="40" color="#e2d5e9" />
                <ul className={css.infoList}>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Author:</p>
                    <p className={css.infoText}>{review.author}</p>
                  </li>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Rating:</p>
                    <p className={css.infoText}>
                      {review.author_details.rating || "N/A"}
                    </p>
                  </li>
                  <li className={css.infoItem}>
                    <p className={css.infoAccent}>Date:</p>
                    <p className={css.infoText}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </li>
                </ul>
              </div>
              <p className={css.textWrapper}>{review.content} </p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && !isLoading && !isError && (
        <p className={css.message}> No review yet...</p>
      )}
    </div>
  );
};

export default MovieReviews;
