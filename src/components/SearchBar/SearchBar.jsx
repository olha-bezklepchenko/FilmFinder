import { Formik, Field, Form } from "formik";
import { SiSearxng } from "react-icons/si";
import css from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.inputWrapper}>
          <Field
            className={css.input}
            name="query"
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search movies"
          />
          <button type="submit" className={css.btnSearch}>
            <SiSearxng size="25px" color="#19042b" className={css.icon} />
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SearchBar;
