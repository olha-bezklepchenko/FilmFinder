import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Section from "../../components/Section/Section.jsx";
import Container from "../../components/Container/Container.jsx";
import css from "./NotFoundPage.module.css";
import image from "../../assets/night.webp";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Section>
      <Container>
        <div className={css.imageBox}>
          <div className={css.imageWrapper}>
            <img
              src={image}
              alt="the night in the wood"
              className={css.image}
            />
          </div>
          <div className={css.titleWrapper}>
            <h1 className={css.title}>404 ERROR</h1>
            <NavLink className={css.btn} to="/">
              Go home
            </NavLink>
          </div>
        </div>
        <div className={css.wrapper}>
          <ErrorMessage
            title="Looks like you’ve gotten lost..."
            message="The page you were looking for is no longer here."
          />
        </div>
      </Container>
    </Section>
  );
};

export default NotFoundPage;
