import '../App.css';

interface SearchResultsProps {
  recentSearches: string[];
  showRecentSearches: boolean;
  handleRecentSearchClick: (query: string) => void;
}
const SearchResults = ({
  showRecentSearches,
  recentSearches,
  handleRecentSearchClick,
}: SearchResultsProps) => {
  return (
    <div className="result_container">
      {showRecentSearches && (
        <div className="recent_searches_panel">
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="recent_search_item"
              onClick={() => handleRecentSearchClick(search)}
            >
              {search}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
