import { Component } from 'react';
import './App.css';
import Menu from './Menu.js';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

interface Data {
  episode_id: number;
  opening_crawl: string;
  title: string;
}

interface State {
  data: Data[] | null;
  loading: boolean;
  searchItem: string;
  filteredItems: Data[] | null;
  recentSearches: string[];
  showRecentSearches: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    const savedSearchItem = localStorage.getItem('searchItem') || '';
    const savedRecentSearches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]',
    );

    this.state = {
      data: null,
      filteredItems: [],
      searchItem: savedSearchItem,
      loading: false,
      recentSearches: savedRecentSearches,
      showRecentSearches: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.addToRecentSearches = this.addToRecentSearches.bind(this);
  }

  handleSearchChange(searchItem: string) {
    this.setState({ searchItem, showRecentSearches: searchItem.length > 0 });
  }

  handleSearch() {
    const trimSearchItem = this.state.searchItem.trim();
    this.setState(
      { searchItem: trimSearchItem, showRecentSearches: false },
      () => {
        localStorage.setItem('searchItem', trimSearchItem);
        this.addToRecentSearches(trimSearchItem);

        this.filterItems(trimSearchItem);
      },
    );
  }

  handleInputFocus() {
    if (this.state.searchItem.length > 0) {
      this.setState({ showRecentSearches: true });
    }
  }

  handleInputBlur() {
    setTimeout(() => this.setState({ showRecentSearches: false }), 200);
  }

  addToRecentSearches(searchItem: string) {
    let { recentSearches } = this.state;
    if (!recentSearches.includes(searchItem)) {
      recentSearches = [searchItem, ...recentSearches].slice(0, 10);
      this.setState({ recentSearches });
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }

  throwError() {
    throw new Error('Test error!');
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const items = await response.json();
      const data: Data[] = items.results;
      this.setState({ data: data, loading: false }, () => {
        this.filterItems(this.state.searchItem);
        console.log(this.state.data, 'fetching');
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  filterItems(searchItem: string) {
    const { data } = this.state;
    const filteredItems = searchItem
      ? data &&
        data.filter((item) => item.title.toLowerCase().includes(searchItem))
      : data;
    this.setState({ filteredItems });
  }

  render() {
    const {
      loading,
      searchItem,
      filteredItems,
      recentSearches,
      showRecentSearches,
    } = this.state;

    return (
      <div className="wrapper">
        <button onClick={this.throwError}>Throw Error</button>

        <SearchBar
          searchItem={searchItem}
          onSearchChange={this.handleSearchChange}
          onSearch={this.handleSearch}
          onInputFocus={this.handleInputFocus}
          onInputBlur={this.handleInputBlur}
        />
        <SearchResults
          recentSearches={recentSearches}
          showRecentSearches={showRecentSearches}
          onRecentSearchClick={this.handleSearchChange}
        />
        <Menu data={filteredItems} loading={loading} />
      </div>
    );
  }
}

export default App;
