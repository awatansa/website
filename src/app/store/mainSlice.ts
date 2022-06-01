import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: true };

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

const { toggleIsLoading } = mainSlice.actions;
const mainReducer = mainSlice.reducer;

export { toggleIsLoading };
export default mainReducer;
