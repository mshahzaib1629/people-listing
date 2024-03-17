import PeopleService from "@/services/peopleService";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface Person {
  id: number;
  name: string;
}

interface PeopleAPIResponse {}
export interface PeopleState {
  people: Person[];
  page: number;
  pageSize: number;
  filter: string;
}

const initialState: PeopleState = {
  people: [],
  filter: "all",
  page: 1,
  pageSize: 10,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    getPeople: (state, action: PayloadAction<PeopleAPIResponse>) => {
      //TODO: get values from the API response and update states
      const {} = action.payload;
      state.people = [];
      state.page = 0;
      state.filter = "";
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.page = 1;
    },
  },
});

export const { getPeople, changeFilter } = peopleSlice.actions;

export const fetchPeopleThunk = (): AppThunk => async (dispatch, getState) => {
  let response;
  try {
    const { page, pageSize, filter } = getState().people;
      response = await PeopleService.fetchPeople(page, pageSize, filter);
    dispatch(getPeople([]));
  } catch (error) {
    console.log("error in fetchPeopleThunk: ", error);
    throw error;
  }
};
export default peopleSlice.reducer;