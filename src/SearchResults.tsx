import React, { Component } from 'react';
import './App.css';

interface SearchResultsProps {
  recentSearches: string[];
  showRecentSearches: boolean;
  onRecentSearchClick: (searchTerm: string) => void;
}

class SearchResults extends Component<SearchResultsProps> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.handleRecentSearchClick = this.handleRecentSearchClick.bind(this);
  }

  handleRecentSearchClick(searchTerm: string) {
    this.props.onRecentSearchClick(searchTerm);
  }
  render(): React.ReactNode {
    const { recentSearches, showRecentSearches } = this.props;

    return (
      <div className="result_container">
        {showRecentSearches && (
          <div className="recent_searches_panel">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="recent_search_item"
                onMouseDown={() => this.handleRecentSearchClick(search)}
              >
                {search}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchResults;
