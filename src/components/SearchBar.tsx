import React from 'react';
import '../App.css';
import icon from '../assets/icons-search.svg';

interface ChildProps {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => Promise<void>;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
}

const SearchBar = ({
  searchItem,
  handleSearch,
  setSearchItem,
  handleInputFocus,
  handleInputBlur,
}: ChildProps) => {
  return (
    <div className="search_container">
      <div className="search_wrapper">
        <div className="search_input-wrapper">
          <input
            className="search_input"
            type={'text'}
            placeholder="type to search..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div
          className="search_icon-img"
          onClick={() => handleSearch(searchItem)}
        >
          <img src={icon} alt="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
