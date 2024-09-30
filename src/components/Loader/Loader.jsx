import { Rings } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <Rings
        visible={true}
        height="100"
        width="100"
        color="#e2d5e9"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      ;
    </div>
  );
};

export default Loader;
