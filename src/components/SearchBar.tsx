import React from 'react';
import '../App.css';
import icon from '../assets/icons-search.svg';

interface ChildProps {
  searchItem: string;

  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => Promise<void>;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  Layout: () => void;
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

// class SearchBar extends Component<ChildProps> {
//   constructor(props: ChildProps) {
//     super(props);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSearchClick = this.handleSearchClick.bind(this);
//     this.handleFocus = this.handleFocus.bind(this);
//     this.handleBlur = this.handleBlur.bind(this);
//   }

//   handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
//     this.props.onSearch();
//     this.props.onSearchChange(event.target.value);
//   }

//   handleSearchClick() {
//     this.props.onSearch();
//   }

//   handleFocus() {
//     this.props.onInputFocus();
//   }

//   handleBlur() {
//     this.props.onInputBlur();
//   }

//   render(): React.ReactNode {
//     const { searchItem } = this.props;

//     return (
//       <div className="search_container">
//         <div className="search_wrapper">
//           <div className="search_input-wrapper">
//             <input
//               className="search_input"
//               type={'text'}
//               placeholder="type to search..."
//               value={searchItem}
//               onChange={this.handleInputChange}
//               onFocus={this.handleFocus}
//               onBlur={this.handleBlur}
//             />
//           </div>
//           <div className="search_icon-img" onClick={this.handleSearchClick}>
//             <img src={icon} alt="search-icon" />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default SearchBar;
