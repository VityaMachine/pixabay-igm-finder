import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({isDisabled}) => {
  return (
    <div className={styles.ButtonContainer}>
      <button className={styles.Button} disabled={isDisabled}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;
