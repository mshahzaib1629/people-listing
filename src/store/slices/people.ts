import PeopleService from "@/services/peopleService";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  pictureUrl: string;
  address: {
    city: string;
    country: string;
    postCode: number;
  };
}

export interface PeopleState {
  people: Person[];
  page: number;
  pageSize: number;
  filter: "all" | "male" | "female";
  isLoading: boolean;
}

const initialState: PeopleState = {
  people: [],
  filter: "all",
  page: 1,
  pageSize: 10,
  isLoading: false,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      // change can be +1 or -1
      const change = action.payload;
      console.log("change: ", state.page);
      if (state.page + change > 0) state.page = state.page + change;
      else state.page = 1;
    },
    updatePeople: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload;
      state.isLoading = false;
    },
    changeFilter: (state, action: PayloadAction<"all" | "male" | "female">) => {
      state.filter = action.payload;
      state.page = 1;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { changePage, startLoading, updatePeople, changeFilter } =
  peopleSlice.actions;

export const fetchPeopleThunk = (): AppThunk => async (dispatch, getState) => {
  let people: Person[] | undefined;
  try {
    const { page, pageSize, filter } = getState().people;
    dispatch(startLoading());
    people = await PeopleService.fetchPeople(page, pageSize, filter);
    dispatch(updatePeople(people!));
  } catch (error) {
    console.log("error in fetchPeopleThunk: ", error);
    throw error;
  }
};
export default peopleSlice.reducer;
