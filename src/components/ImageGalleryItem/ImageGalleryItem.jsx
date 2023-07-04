import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imgUrl, imgText }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imgUrl}
        alt={imgText}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
