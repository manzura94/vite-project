import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

interface LayoutProps {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => Promise<void>;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  recentSearches: string[];
  showRecentSearches: boolean;
  handleRecentSearchClick: (query: string) => void;
}

const Layout = ({
  handleSearch,
  searchItem,
  setSearchItem,
  handleInputFocus,
  handleInputBlur,
  showRecentSearches,
  recentSearches,
  handleRecentSearchClick,
}: LayoutProps) => {
  return (
    <div className="layout">
      <div className="menu-section">
        <SearchBar
          handleSearch={handleSearch}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />
        <SearchResults
          showRecentSearches={showRecentSearches}
          recentSearches={recentSearches}
          handleRecentSearchClick={handleRecentSearchClick}
        />
      </div>
      <div className="content-section">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
