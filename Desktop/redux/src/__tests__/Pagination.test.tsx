import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../slices/paginationSlice.js';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';
import { Pagination } from '../components/Pagination.js';

const createTestStore = () => {
    return configureStore({
        reducer: {
            pagination: paginationReducer,
        },
        preloadedState: {
            pagination: { page: 1 },
        },
    });
};

describe('Pagination component', () => {
    it('renders and handles page navigation', () => {
        const store = createTestStore();
        const themeContextValue: ThemeContextType = { theme: 'light', toggleTheme: vi.fn() };

        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <Pagination />
                </ThemeContext.Provider>
            </Provider>
        );

        const prevButton = screen.getByText('prev');
        const nextButton = screen.getByText('next');

        expect(prevButton).toBeDisabled();
        expect(screen.getByText('{1}')).toBeInTheDocument();
        expect(nextButton).not.toBeDisabled();

        fireEvent.click(nextButton);

        expect(screen.getByText('{2}')).toBeInTheDocument();
        expect(prevButton).not.toBeDisabled();

        fireEvent.click(prevButton);

        expect(screen.getByText('{1}')).toBeInTheDocument();
        expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', () => {
        const store = configureStore({
            reducer: {
                pagination: paginationReducer,
            },
            preloadedState: {
                pagination: { page: 10 },
            },
        });

        const themeContextValue: ThemeContextType = { theme: 'light', toggleTheme: vi.fn() };

        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <Pagination />
                </ThemeContext.Provider>
            </Provider>
        );

        const prevButton = screen.getByText('prev');
        const nextButton = screen.getByText('next');

        expect(prevButton).not.toBeDisabled();
        expect(nextButton).toBeDisabled();
        expect(screen.getByText('{10}')).toBeInTheDocument();
    });
});


