import { Formik, Field, Form } from "formik";
import { SiSearxng } from "react-icons/si";
import { FiXCircle } from "react-icons/fi";
import css from "./SearchBar.module.css";

const SearchBar = ({ query, handleChangeQuery }) => {
  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  const handleReset = () => {
    handleChangeQuery("");
  };

  return (
    <Formik
      initialValues={{ query: query || "" }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className={css.form}>
        <div className={css.inputWrapper}>
          <Field
            className={css.input}
            name="query"
            type="text"
            autoFocus
            autoComplete="on"
            placeholder="Search query"
          />
          <button type="submit" className={css.btnSearch}>
            <SiSearxng size="25px" color="#19042b" className={css.icon} />
          </button>
          {query && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Clear search"
              className={css.btnClear}
            >
              <FiXCircle size="25px" color="#19042b" className={css.icon} />
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default SearchBar;
