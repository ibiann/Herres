import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import cardReducer from './reducers/cardSlide'
import alertReducer from "./reducers/alertSlice";
import listReducer from "./reducers/listSlice"
const store = configureStore({
  // reducer: authSlice.reducer,
  reducer: {
    auth: authSlice,
    card: cardReducer,
    alert: alertReducer,
    list: listReducer,
  }
  
});

export default store;
