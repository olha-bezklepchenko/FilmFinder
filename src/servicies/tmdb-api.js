import axios from "axios";
import { env } from "./env";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const MY_API_KEY = env("VITE_APP_API_KEY");

export const getTrendingMovies = async (time) => {
  const response = await axios.get(`/trending/movie/${time}`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });
  return response.data.results;
};

export const getSearchingMovie = async (query, page) => {
  const response = await axios.get("/search/movie", {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
    params: {
      query,
      page,
    },
  });

  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });

  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });

  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });

  return response.data.results;
};

export const getPersonDetails = async (personId) => {
  const response = await axios.get(`person/${personId}`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });

  return response.data;
};

export const getPersonMovie = async (personId) => {
  const response = await axios.get(`person/${personId}/movie_credits`, {
    headers: { Authorization: `Bearer ${MY_API_KEY}` },
  });

  return response.data.cast;
};
