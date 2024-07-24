import { useContext } from 'react';
import './App.css';
import { BookList } from './components/BookList.js';
import { Header } from './components/Header.js';
import { Pagination } from './components/Pagination.js';
import { ThemeContext, ThemeContextType } from './context/ThemeContext.js';

function App() {
    const { theme } = useContext(ThemeContext) as ThemeContextType;

    return (
        <>
            <div className={`wrapper ${theme}`} data-testid="app-wrapper">
                <Header />
                <BookList />
                <Pagination />
            </div>
        </>
    );
}

export default App;
