import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "../MovieCast/MovieCast.module.css";

import { getMovieCast } from "../../servicies/tmdb-api";
import PeopleList from "../PeopleList/PeopleList.jsx";

const MovieCrew = () => {
  const [crew, setCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCrew = async () => {
      try {
        setIsLoading(true);
        const movieCrew = await getMovieCast(movieId);
        setCrew(movieCrew.crew);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCrew();
  }, [movieId]);

  const importantJobs = [
    "Director",
    "Producer",
    "Writer",
    "Editor",
    "Director of Photography",
    "Original Music Composer",
    "Production Design",
    "Casting Director",
    "Visual Effects Editor",
    "Sound Designer",
    "Costume Design",
  ];
  const filteredCrew = crew
    .filter((person) => importantJobs.includes(person.job))
    .sort((a, b) => {
      const aJobIndex = importantJobs.indexOf(a.job);
      const bJobIndex = importantJobs.indexOf(b.job);
      return aJobIndex - bJobIndex;
    });

  const crewPersons = {};

  filteredCrew.forEach(({ id, name, job, profile_path }) => {
    if (crewPersons[name]) {
      crewPersons[name].job.push(job);
    } else {
      crewPersons[name] = { id, name, job: [job], profile_path };
    }
  });

  const crewArray = Object.values(crewPersons);

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage
          title="Something went wrong..."
          message="Unable to load the crew details. Please check your internet connection
              or try again later."
        />
      )}
      {crew.length > 0 && (
        <PeopleList people={crewArray} isCrew={true} isScrollEnabled={true} />
      )}
      {crew.length === 0 && !isLoading && !isError && (
        <p className={css.message}>No cast information available.</p>
      )}
    </>
  );
};

export default MovieCrew;
