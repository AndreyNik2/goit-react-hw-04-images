import React from 'react';
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

class App extends React.Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
    selectedImage: null,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      query: event.target.elements.query.value,
      hits: [],
      page: 1,
    });
    event.target.reset();
  };

  selectImage = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  resetImage = imageURL => {
    this.setState({ selectedImage: null });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const page = this.state.page;
        const query = this.state.query;
        const { hits, totalHits } = await fetchResults(query, page);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          totalHits: totalHits,
          isLoading: false,
        }));
        if (totalHits === 0 || !totalHits) {
          toast.error('Nothing found for your request :(');
        }
        this.setState({ isLoading: false });
      } catch (error) {
        toast.error('Something went wrong :( Try reloading the page.');
      }
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({ page: (prevState.page += 1) }));
  };

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <main>
          <ImageGallery isLoading={this.state.isLoading} selectImage={this.selectImage} hits={this.state.hits} />
          {this.state.totalHits > 12 && (
            <LoadMore incrementPage={this.incrementPage} />
          )}
          <Toaster position="top-right" />
        </main>
        <Modal
          isOpen={this.state.selectedImage !== null}
          onRequestClose={this.resetImage}
          style={modalStyles}
          shouldCloseOnEsc={this.state.selectedImage !== null}
        >
          <img src={this.state.selectedImage} alt="Large" width="720px" />
        </Modal>
      </>
    );
  }
}

export default App;
