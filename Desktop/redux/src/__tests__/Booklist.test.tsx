import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { ThemeContext, ThemeContextType } from '../context/ThemeContext.js';
import { BookList } from '../components/BookList.js';
import { store } from '../app/store.js';

vi.mock('../api/booksApi', () => ({
    booksApi: {
        useGetBooksQuery: vi.fn(() => ({
            data: {
                books: [
                    { uid: '1', title: 'Book 1', publishedMonth: 1, publishedYear: 2024, numberOfPages: 100 },
                    { uid: '2', title: 'Book 2', publishedMonth: 2, publishedYear: 2024, numberOfPages: 200 },
                ],
            },
            error: null,
            isLoading: false,
        })),
        reducerPath: 'booksApi',
        reducer: () => ({}),
        middleware: () => (next: Dispatch<any>) => (action: any) => next(action),
    },
}));

const themeContextValue: ThemeContextType = { theme: 'light', toggleTheme: () => {} };

describe('BookList component', () => {
    it('renders book items correctly', async () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <BookList />
                </ThemeContext.Provider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('Book 2')).toBeInTheDocument();
        });
    });

    it('selects and unselects books correctly', async () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <BookList />
                </ThemeContext.Provider>
            </Provider>
        );

        expect(screen.queryByText('selected 1 item')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Book 1'));

        expect(screen.getByText('selected 1 item')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Book 1'));

        expect(screen.queryByText('selected 1 item')).not.toBeInTheDocument();
    });

    it('handles clear selection button correctly', async () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <BookList />
                </ThemeContext.Provider>
            </Provider>
        );

        fireEvent.click(screen.getByText('Book 1'));

        expect(screen.getByText('selected 1 item')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Unselect All'));

        await waitFor(() => {
            expect(screen.queryByText('selected 1 item')).not.toBeInTheDocument();
        });
    });

    it('handles download button correctly', async () => {
        const createElementSpy = vi.spyOn(document, 'createElement');
        const appendChildSpy = vi.spyOn(document.body, 'appendChild');
        const removeChildSpy = vi.spyOn(document.body, 'removeChild');
        
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={themeContextValue}>
                    <BookList />
                </ThemeContext.Provider>
            </Provider>
        );


        fireEvent.click(screen.getByText('Book 1'));
        fireEvent.click(screen.getByTestId('download-button'));

        await waitFor(() => {
            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();
        });

        createElementSpy.mockRestore();
        appendChildSpy.mockRestore();
        removeChildSpy.mockRestore();

       
    });
});
