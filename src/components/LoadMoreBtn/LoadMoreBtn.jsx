import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ isDisabled, onLoadMoreClick }) => {
  return (
    <div className={styles.ButtonContainer}>
      <button
        onClick={onLoadMoreClick}
        className={styles.Button}
        disabled={isDisabled}
      >
        {!isDisabled ? "Load more" : "No more images to load"}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
