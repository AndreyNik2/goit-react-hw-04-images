import { SearchForm, ButtonSubmit } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ handleSubmit }) => {
  return (
    <header className="searchbar">
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSubmit type="submit">
          <FcSearch />
        </ButtonSubmit>
        <input
          type="text"
          name="query"
          className="input"
          placeholder="Search images and photos"
        ></input>
      </SearchForm>
    </header>
  );
};
