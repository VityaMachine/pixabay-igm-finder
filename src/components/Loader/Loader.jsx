import { MagnifyingGlass } from "react-loader-spinner";

import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <MagnifyingGlass
        visible={true}
        height="150"
        width="150"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#303f9f"
      />
    </div>
  );
};

export default Loader;
