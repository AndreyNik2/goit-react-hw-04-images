import { Circles } from 'react-loader-spinner';
import { ImageItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  isLoading,
  selectImage,
  tags,
  webformatURL,
  largeImageURL,
}) => {
  return (
    <ImageItem className="gallery-item">
      {!isLoading && (
        <Img
          alt={tags}
          src={webformatURL}
          onClick={() => selectImage(largeImageURL)}
        ></Img>
      )}
      <Circles
        height="100"
        width="100"
        color="#641cf4"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={Boolean(isLoading)}
      />
    </ImageItem>
  );
};
