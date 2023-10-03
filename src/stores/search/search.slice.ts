import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { PlacesMapApi, Prediction } from "@/utils/helper";
import { LocationType } from "@/hooks";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Motel } from "@/utils/type";

// Define a type for the slice state
interface SearchState {
  places: Prediction[] | undefined;
  inputIsFocus: boolean;
  debouncedSearch: string;
  locationHasBeenSearch: LocationType | undefined;
  searchKey: string;
  placeSeleted: string;
  motels: Motel[];
}

// Define the initial state using that type
const initialState: SearchState = {
  places: [],
  inputIsFocus: false,
  debouncedSearch: "",
  locationHasBeenSearch: undefined,
  searchKey: "",
  placeSeleted: "",
  motels: [],
};

// Thunks
export const searchPlaces = createAsyncThunk(
  "searchs/searchPlacesData",
  async (input: string) => {
    if (input.length > 0) {
      const response = await PlacesMapApi.searchWithAutocompleteApi({
        input,
      });

      return response;
    }
  }
);
export const getLocation = createAsyncThunk(
  "searchs/getLocationData",
  async (placeId: string) => {
    if (!placeId) return;
    const location = await PlacesMapApi.getLocationByPlaceId(placeId);
    return location;
  }
);

export const searchSlice = createSlice({
  name: "searchs",
  initialState,
  reducers: {
    searchOnChangeHandler: (state, action: PayloadAction<string>) => {
      if (action.payload.length === 0) return;
      console.log("action: ", action.payload);
      return {
        ...state,
        searchKey: action.payload,
      };
    },
    changeSearchInputFocus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        searchKey: "",
        inputIsFocus: action.payload,
      };
    },
    changeSearchInputValueHandler: (
      state,
      action: PayloadAction<{
        searchValue: string;
        place_id: string;
      }>
    ) => {
      return {
        ...state,
        searchKey: action.payload.searchValue,
        inputIsFocus: false,
        placeSeleted: action.payload.place_id,
      };
    },
    saveMotels: (state, action: PayloadAction<Motel[] | undefined>) => {
      if (!action.payload) return;

      return {
        ...state,
        motels: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      searchPlaces.fulfilled,
      (state, action: PayloadAction<Prediction[] | undefined>) => {
        // Add user to the state array
        if (action.payload && action.payload?.length > 0) {
          state.places?.splice(0, 0);
          state.places?.push(...action.payload);
        }
      }
    );
    builder.addCase(
      getLocation.fulfilled,
      (state, action: PayloadAction<LocationType | undefined>) => {
        if (!action.payload) return;
        return {
          ...state,
          locationHasBeenSearch: action.payload,
        };
      }
    );
  },
});

export const {
  changeSearchInputFocus,
  changeSearchInputValueHandler,
  saveMotels,
  searchOnChangeHandler,
} = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const searchStore = (state: RootState) => state.searchs;

export const searchReducer = searchSlice.reducer;
