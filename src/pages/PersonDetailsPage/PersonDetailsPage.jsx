import {
  Link,
  //   NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import { getPersonDetails } from "../../servicies/tmdb-api";
import css from "./PersonDetailsPage.module.css";
import MoviesByPerson from "../../components/MoviesByPerson/MoviesByPerson.jsx";
// import { BsPatchQuestion } from "react-icons/bs";

const PersonDetailsPage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { personId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const defaultImg =
    "https://dummyimage.com/400x600/c2b8c7/40065e.jpg&text=No+photo";

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const personDetails = await getPersonDetails(personId);
        setProfile(personDetails);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersonDetails();
  }, [personId]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {!isLoading && isError && (
          <ErrorMessage
            title="Something went wrong..."
            message="Unable to load the person details. Please try again later."
          />
        )}
        {!isLoading && !isError && profile && (
          <>
            <Link to={goBackRef.current} className={css.backLink}>
              Go back
            </Link>
            <div className={css.wrapper}>
              <div className={css.photoWrapper}>
                <img
                  className={css.profilePhoto}
                  src={
                    profile?.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile.profile_path}`
                      : defaultImg
                  }
                  alt="profile.name"
                />
              </div>
              <div className={css.infoWrapper}>
                <h1 className={css.title}>{profile.name}</h1>
                <ul className={css.infoList}>
                  {profile.birthday && profile.deathday ? (
                    <li className={css.infoItem}>
                      <h2 className={css.infoAccent}> Dates of life:</h2>
                      <p className={css.infoText}>
                        {formatDate(profile.birthday)} -{" "}
                        {formatDate(profile.deathday)}
                      </p>
                    </li>
                  ) : null}
                  {profile.birthday && !profile.deathday ? (
                    <li className={css.infoItem}>
                      <h2 className={css.infoAccent}>Data of birth:</h2>
                      <p className={css.infoText}>
                        {formatDate(profile.birthday)}
                      </p>
                    </li>
                  ) : null}

                  <li className={css.infoItem}>
                    <h2 className={css.infoAccent}>Known for:</h2>
                    <p className={css.infoText}>
                      {profile.known_for_department}
                    </p>
                  </li>
                  <li className={css.biographyItem}>
                    <h2 className={css.infoAccent}>Biography:</h2>
                    {profile.biography ? (
                      <p className={css.biography}>{profile.biography}</p>
                    ) : (
                      <p className={css.message}>
                        {`The ${profile.name}'s biography remains a mystery for
                              now.`}
                      </p>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {profile && <MoviesByPerson personId={personId} name={profile.name} />}
      </Container>
    </Section>
  );
};

export default PersonDetailsPage;
