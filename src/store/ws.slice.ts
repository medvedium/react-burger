import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWsState {
  status: string;
  connectionError: string;
}

const initialState: IWsState = {
  status: "",
  connectionError: "",
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    connecting(state) {
      state.status = "Connecting";
    },
    open(state) {
      state.status = "Online";
    },
    close(state) {
      state.status = "Offline";
    },
    error(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
  },
});

export const wsActions = wsSlice.actions;
export const wsReducer = wsSlice.reducer;
