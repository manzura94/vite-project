import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
    uid: string;
    title: string;
    numberOfPages: number;
    publishedMonth: number;
    publishedYear: number;
}

export interface BooksResponse {
    books: Book[];
}

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/' }),

    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, { page: number }>({
            query: ({ page }) => `book/search?pageNumber=${page}&pageSize=9`,
        }),
    }),
});


