import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import locationReducer from "../features/locationSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        location: locationReducer,
    }
})