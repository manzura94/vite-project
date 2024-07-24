import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../app/store.js';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';
import App from '../App.js';

vi.mock('../components/Header', () => ({
    Header: () => <div>Header Component</div>,
}));

vi.mock('../components/BookList', () => ({
    BookList: () => <div>BookList Component</div>,
}));

vi.mock('../components/Pagination', () => ({
    Pagination: () => <div>Pagination Component</div>,
}));

const themeContextValue: ThemeContextType = { theme: 'light', toggleTheme: vi.fn() };

describe('App component', () => {
    it('renders Header, BookList, and Pagination components', () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <App />
                </ThemeContext.Provider>
            </Provider>
        );

        expect(screen.getByText('Header Component')).toBeInTheDocument();

        expect(screen.getByText('BookList Component')).toBeInTheDocument();

        expect(screen.getByText('Pagination Component')).toBeInTheDocument();
    });

    it('applies the correct theme class to the wrapper', () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ ...themeContextValue, theme: 'dark' }}>
                    <App />
                </ThemeContext.Provider>
            </Provider>
        );

        const wrapperElement = screen.getByTestId('app-wrapper');

        expect(wrapperElement).toHaveClass('wrapper');
        expect(wrapperElement).toHaveClass('dark');
    });
});
