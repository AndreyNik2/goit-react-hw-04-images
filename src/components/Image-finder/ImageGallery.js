import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ isLoading, selectImage, hits }) => {
  return (
    <ImageList className="gallery">
      {hits.map(hit => (
        <ImageGalleryItem
          isLoading={isLoading}
          selectImage={selectImage}
          tags={hit.tags}
          key={hit.id}
          webformatURL={hit.webformatURL}
          largeImageURL={hit.largeImageURL}
        />
      ))}
    </ImageList>
  );
};
