import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
    name:"player",
    initialState:{
        player_info:{ stage: 1, total_earnings: 50 }
    },
    reducers:{
       addTotalEarnings:(state, action)=>{
            const { earning_value } = action.payload;
            state.player_info.total_earnings += earning_value;
       },
       reduceTotalEarnings:(state, action)=>{
            const { expense_value } = action.payload;
            state.player_info.total_earnings -= expense_value;
       },
       addUserStage:(state,action)=>{
          const { land_price } = action.payload;
          state.player_info.total_earnings-=land_price;
          state.player_info.stage += 1;
       }

    }
});

export const { addTotalEarnings, reduceTotalEarnings, addUserStage } = users.actions;
export default users.reducer;