import React from 'react';
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
              // onMouseDown={() => this.handleRecentSearchClick(search)}
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

// class SearchResults extends Component<SearchResultsProps> {
//   constructor(props: SearchResultsProps) {
//     super(props);
//     this.handleRecentSearchClick = this.handleRecentSearchClick.bind(this);
//   }

//   handleRecentSearchClick(searchTerm: string) {
//     this.props.onRecentSearchClick(searchTerm);
//   }
//   render(): React.ReactNode {
//     const { recentSearches, showRecentSearches } = this.props;

//     return (
//       <div className="result_container">
//         {showRecentSearches && (
//           <div className="recent_searches_panel">
//             {recentSearches.map((search, index) => (
//               <div
//                 key={index}
//                 className="recent_search_item"
//                 onMouseDown={() => this.handleRecentSearchClick(search)}
//               >
//                 {search}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default SearchResults;
