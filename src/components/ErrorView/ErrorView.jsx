import styles from "./ErrorView.module.css";

import noFoundImg from "../../images/no_found.png";

const ErrorView = ({ error }) => {
  return (
    <>
      <h3 className={styles.text}>{error}</h3>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={noFoundImg} alt="error_image" />
      </div>
    </>
  );
};

export default ErrorView;
