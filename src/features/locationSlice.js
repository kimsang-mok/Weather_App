import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLocation = createAsyncThunk(
    "location/fetchLocation", () => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const geolocationData = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        // Store the geolocation data in localStorage
                        localStorage.setItem('geolocation', JSON.stringify(geolocationData));

                        resolve(geolocationData);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }
);

// Check if geolocation data is already in localStorage
const storedGeolocation = localStorage.getItem('geolocation');
const initialLocation = storedGeolocation ? JSON.parse(storedGeolocation) : null;

const locationSlice = createSlice({
    name: "location",
    initialState: { data: initialLocation, status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLocation.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchLocation.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(fetchLocation.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export default locationSlice.reducer;