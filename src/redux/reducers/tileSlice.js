import { createSlice } from "@reduxjs/toolkit";

export const tileSlice = createSlice({
    name:"tiles",
    initialState:{
        active_tile:{index:0, status:"null"},
        tile_container:[{ status:"null" },{ status:"null" },{ status:"null" },{ status:"null" },
                        { status:"null" },{ status:"null" },{ status:"null" },{ status:"null" },
                        { status:"null" },{ status:"null" },{ status:"null" },{ status:"null" },
                        { status:"null" },{ status:"null" },{ status:"null" },{ status:"null" },]
    },
    reducers:{
        changeToNull:(state, action) =>{
            const { tile_index } = action.payload;
            state.tile_container[tile_index].status = "null";
        },
        changeToTilled:(state, action) =>{
            const { tile_index } = action.payload;
            state.tile_container[tile_index].status = "tilled";
        },
        changeToPlanted:(state, action) =>{
            const { tile_index, plant_name, plant_id } = action.payload;
            state.tile_container[tile_index].status = "planted";
            state.tile_container[tile_index].plant_name = plant_name;
            state.tile_container[tile_index].plant_id = plant_id;
        },
        changeToHarvest:(state, action)=>{
            const { tile_index } = action.payload;
            if(state.tile_container[tile_index].status === "planted"){
                state.tile_container[tile_index].status = "harvest";
            }
        },
        setTimer:(state, action)=>{
            const {tile_index ,time_left} = action.payload;
            state.tile_container[tile_index].time_left = time_left;
        },
        setActiveTile:(state, action)=>{
            const {index, status} = action.payload;
            state.active_tile = {index: index, status: status};
        },
        expandTiles:(state, action)=>{
            const {add} = action.payload;
            for( let add_tile_index = 0; add_tile_index < add; add_tile_index++){
                state.tile_container.push({ status:"null" });
            }
        }
    }
});

export const { setActiveTile, changeToNull, changeToTilled, changeToPlanted, changeToHarvest, setTimer, expandTiles} = tileSlice.actions;
export default tileSlice.reducer;