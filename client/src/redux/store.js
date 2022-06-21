import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
const store = configureStore({
  reducer: authSlice.reducer,
});

export default store;
