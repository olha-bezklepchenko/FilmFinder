import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const MY_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTM1ZGQxMDQ0YmM1ODRiN2U0YmM4ZDQ0ZTMzY2YyMyIsIm5iZiI6MTcyNzQzMjE4My41Mzg0OTcsInN1YiI6IjY2ZjY4MmIwNmNlZGJlZDAxNTcwYjliNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rBI6q8q4rCRNkK0aE1QO81OXvcaO9461FRBBUA5i82I";

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`, {
      headers: { Authorization: `Bearer ${MY_API_KEY}` },
    });
    return response.data.results;
  } catch (error) {
    console.error(error.message);
  }
};

export const getSearchingMovie = async (query, page) => {
  try {
    const response = await axios.get("/search/movie", {
      headers: { Authorization: `Bearer ${MY_API_KEY}` },
      params: {
        query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`, {
      headers: { Authorization: `Bearer ${MY_API_KEY}` },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, {
      headers: { Authorization: `Bearer ${MY_API_KEY}` },
    });

    return response.data.cast;
  } catch (error) {
    console.error(error.message);
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, {
      headers: { Authorization: `Bearer ${MY_API_KEY}` },
    });

    return response.data.results;
  } catch (error) {
    console.error(error.message);
  }
};
