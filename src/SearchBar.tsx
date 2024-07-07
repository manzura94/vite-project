import React, { Component } from 'react';
import './App.css';
import icon from './assets/icons-search.svg';

interface ChildProps {
    searchItem: string;
    onSearchChange: (searchTerm: string) => void;
    onSearch: () => void;
}

class SearchBar extends Component<ChildProps> {
    constructor(props: ChildProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onSearch();
        this.props.onSearchChange(event.target.value);
    }

    handleSearchClick() {
        this.props.onSearch();
    }

    render(): React.ReactNode {
        return (
            <div className='search_container'>
                <div className='search_wrapper'>
                    <div className='search_input-wrapper'>
                        <input className='search_input' type={'text'} placeholder='type to search...' value={this.props.searchItem} onChange={this.handleInputChange} />
                    </div>
                    <div className='search_icon-img' onClick={this.handleSearchClick}>
                        <img src={icon} alt='search-icon' />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
