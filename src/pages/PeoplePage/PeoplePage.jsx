import { useSearchParams } from "react-router-dom";
import {
  getSearchingPerson,
  getTrendingPeople,
} from "../../servicies/tmdb-api";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PeopleList from "../../components/PeopleList/PeopleList.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import { useState, useEffect } from "react";

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!query) {
      const fetchPeople = async () => {
        try {
          setIsLoading(true);
          setIsError(false);
          const trendingPeople = await getTrendingPeople();
          setPeople(trendingPeople);
        } catch (error) {
          setIsError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPeople();
    }
    const searchPersons = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setPersons([]);
        const data = await getSearchingPerson(query, page);
        setPersons(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    searchPersons();
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      setSearchParams({});
      setPersons([]);
      return;
    }
    setSearchParams({ query: newQuery, page: 0 });
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Section>
        <Container>
          <SearchBar query={query} handleChangeQuery={handleChangeQuery} />
          {isLoading && <Loader />}
          {isError && (
            <ErrorMessage
              title="Something went wrong..."
              message=" We couldn't load the people. Please check your internet connection
            or try again later."
            />
          )}

          {!query && people?.length > 0 && (
            <>
              <PeopleList persons={people} />
            </>
          )}

          {query && persons?.length > 0 ? (
            <>
              <PeopleList persons={persons} />
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
                message="There are no person to display.Try another query."
              />
            )
          )}
        </Container>
      </Section>
    </>
  );
};

export default PeoplePage;
