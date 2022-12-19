import axios from 'axios';

const APIkey = '30639478-19eb6c69dd958be70fa1abe06';
const baseUrl = 'https://pixabay.com/api/';

export const fetchResults = async (query, page) => {
    const response = await axios.get(
      `${baseUrl}?key=${APIkey}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
    return response.data;
}