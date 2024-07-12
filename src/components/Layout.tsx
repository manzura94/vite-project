import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

const Layout = () => {
  return (
    <div className="layout">
      <div className="menu-section">
        <SearchBar />
        <SearchResults />
      </div>
      <div className="content-section">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
