import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../api/booksApi.js';

export interface ItemState {
    item: Book[];
}

const initialState: ItemState = {
    item: [],
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Book[]>) {
            state.item = action.payload;
        },
    },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
