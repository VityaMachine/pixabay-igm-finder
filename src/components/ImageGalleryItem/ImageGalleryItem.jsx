import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imgUrl, imgText, largeImgUrl, onModalOpen }) => {


  return (
    <li className={styles.ImageGalleryItem} onClick={()=>onModalOpen(largeImgUrl, imgText)}>
      <img
        src={imgUrl}
        alt={imgText}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
