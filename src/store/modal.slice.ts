import {createSlice} from "@reduxjs/toolkit";

interface IModalState {
	modalIsOpen: boolean;
}

const initialState: IModalState = {
	modalIsOpen: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal(state) {
			state.modalIsOpen = true;
		},
		closeModal(state) {
			state.modalIsOpen = false;
		},
	},
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
