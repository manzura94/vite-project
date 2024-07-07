import { Component } from 'react';
// import React from 'react';
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
}

class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        const savedSearchItem = localStorage.getItem('searchItem') || '';
        this.state = {
            data: null,
            filteredItems: [],
            searchItem: savedSearchItem,
            loading: false,
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearchChange(searchItem: string) {
        this.setState({ searchItem });
    }

    handleSearch() {
        const trimSearchItem = this.state.searchItem.trim();
        this.setState({ searchItem: trimSearchItem }, () => {
            localStorage.setItem('searchItem', trimSearchItem);
            this.filterItems(trimSearchItem);
        });

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
        const filteredItems = data && data.filter((item) => item.title.toLowerCase().includes(searchItem));
        console.log(data && data.filter((item) => item.title.toLowerCase().includes(searchItem)), 'filter');
        this.setState({ filteredItems });
    }

    render() {
        const { loading, searchItem, filteredItems } = this.state;

        return (
            <div className='wrapper'>
                <SearchBar searchItem={searchItem} onSearchChange={this.handleSearchChange} onSearch={this.handleSearch} />
                <SearchResults />
                <Menu data={filteredItems} loading={loading} />
            </div>
        );
    }
}

export default App;
