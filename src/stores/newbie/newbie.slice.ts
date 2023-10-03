import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
// import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface NewbieState {
  isNewBie: boolean;
}

// Define the initial state using that type
const initialState: NewbieState = {
  isNewBie: true, // false // true -- use redux persist to store state
};

export const newbieSlice = createSlice({
  name: "newbie",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = newbieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isNewbie = (state: RootState) => state.newbies.isNewBie;

export const newbieReducer = newbieSlice.reducer;
