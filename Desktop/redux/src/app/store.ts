import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from '../api/booksApi.js';
import paginationReduser, { PaginationState } from '../slices/paginationSlice.js';
import itemsReducer, { ItemState } from '../slices/itemSlice.js';
import selectedItemsReducer, { SelectedItem } from '../slices/selectedItems.js';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        pagination: paginationReduser,
        items: itemsReducer,
        selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = {
    booksApi: ReturnType<typeof booksApi.reducer>;
    pagination: PaginationState;
    items: ItemState;
    selectedItems: SelectedItem;
};
