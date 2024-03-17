import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import peopleReducer from "./slices/people";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
