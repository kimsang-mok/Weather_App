import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const apiKey = "be4a998ea9f7012606ebf5bb21a41873"
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (coords) => {
        const response = await api.get(`weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`)
        return response.data;
    }
)

const weatherSlice = createSlice({
    name: "weather",
    initialState: { data: {}, status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = "loading";
        })
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = "succeed",
                state.data = action.payload;
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.status = "fail";
            state.error = action.error.message;
        })

    }
})

/*
const weatherSlice = createSlice({
    name: "weather",
    initialState: { data: {}, status: "idle", error: null },
    reducers: {},
    extraReducers: {
        [fetchWeather.pending]: (state) => {
            state.status = "loading";
        },
        [fetchWeather.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.data = action.payload;
        },
        [fetchWeather.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});
*/

export default weatherSlice.reducer;