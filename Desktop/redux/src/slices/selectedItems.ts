import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../api/booksApi.js';

export interface SelectedItem {
    selectedItem: Book[];
}

const initialState: SelectedItem = {
    selectedItem: [],
};

const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    reducers: {
        setSelectedItem(state, action: PayloadAction<Book>) {
            state.selectedItem.push(action.payload);
        },
        removeSelectedItem(state, action) {
            state.selectedItem = state.selectedItem.filter((obj) => obj.uid !== action.payload.uid);
        },
        clearSelectedItem(state) {
            state.selectedItem = [];
        },
    },
});

export const { setSelectedItem, removeSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
