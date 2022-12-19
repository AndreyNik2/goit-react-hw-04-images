import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMore } from './LoadMore';
import { fetchResults } from './Api';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const AppSearch = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const isMounted = useRef(false);

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(event.target.elements.query.value);
    setHits([]);
    setPage(1);
    event.target.reset();
  };

  const selectImage = imageURL => {
    setSelectedImage(imageURL);
  };

  const resetImage = () => {
    setSelectedImage(null);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  // useEffect(() => {
  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //     console.log('до');
  //     return;
  //   }
  //   console.log('после');
  //   setIsLoading(true);
  //   fetchResults(query, page).then(images => {
  //     setHits(p => [...p, ...images.hits]);
  //     setTotalHits(images.totalHits);
  //     setIsLoading(false);

  //   }).catch(toast.error('Something went wrong :( Try reloading the page.'))
  // }, [page, query]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (query.length === 0) {
      return;
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchResults(query, page);
        setHits(p => [...p, ...hits]);
        setTotalHits(totalHits);
        setIsLoading(false);
        if (totalHits === 0 || !totalHits) {
          toast.error('Nothing found for your request :(');
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong :( Try reloading the page.');
      }
    }
    fetchData();
  }, [page, query]);

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <main>
        <ImageGallery
          isLoading={isLoading}
          selectImage={selectImage}
          hits={hits}
        />
        {totalHits > 12 && <LoadMore loadMoreProp={incrementPage} />}
        <Toaster position="top-right" />
      </main>
      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={resetImage}
        style={modalStyles}
        shouldCloseOnEsc={selectedImage !== null}
      >
        <img src={selectedImage} alt="Large" width="720px" />
      </Modal>
    </>
  );
};

export default AppSearch;
