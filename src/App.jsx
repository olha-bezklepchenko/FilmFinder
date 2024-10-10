import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "modern-normalize/modern-normalize.css";
import { lazy, Suspense } from "react";
import ScrollTopBtn from "./components/ScrollTopBtn/ScrollTopBtn";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const PersonDetailsPage = lazy(() =>
  import("./pages/PersonDetailsPage/PersonDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieCrew = lazy(() => import("./components/MovieCrew/MovieCrew"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="crew" element={<MovieCrew />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/person/:personId" element={<PersonDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ScrollTopBtn />
    </>
  );
}

export default App;
