import { configureStore } from "@reduxjs/toolkit";
import tileSlice from "./reducers/tileSlice";
import usersReducer from "./reducers/earningSlice";

export const store = configureStore({
    reducer:{
        tiles: tileSlice,
        users: usersReducer
    },
});

