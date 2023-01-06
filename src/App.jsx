import './App.scss';
import React from 'react';
import Tile from './components/Tile';
import { useSelector, useDispatch } from 'react-redux';
import { expandTiles } from "./redux/reducers/tileSlice";
import { addUserStage } from './redux/reducers/earningSlice';
import { EXPAND_LAND } from './config/constants';

function App() {
    const dispatch = useDispatch();
    const { tile_container } = useSelector(state => state.tiles);
    const { player_info } = useSelector(state => state.users);

    const expandLand = () =>{
        dispatch(addUserStage({land_price: EXPAND_LAND[player_info.stage].price}));
        dispatch(expandTiles({add: EXPAND_LAND[player_info.stage].add}));
    }

    return (
        <>
            <h1>Parmbili</h1>
            <main>
                <div id="tile_container"  style={{ width: `${EXPAND_LAND[player_info.stage-1].size * 120 }px`}}>
                    {tile_container.map((tile_item_data, tile_index)=> 
                        <Tile key={tile_index} tile_index={tile_index} data={tile_item_data}/>)
                    }
                    <p id="total_earnings">Total Earnings: {player_info.total_earnings}$</p>
                    {player_info.stage < 4 ? 
                        <button id="expand_land_button" className="active" type="button" onClick={expandLand} disabled={ player_info.total_earnings >= EXPAND_LAND[player_info.stage].price ? false : true}>
                            <span>Expand Land to {EXPAND_LAND[player_info.stage].size} x {EXPAND_LAND[player_info.stage].size}</span>
                            <span>{EXPAND_LAND[player_info.stage].price}$</span>
                        </button>:""}
                </div>
            </main>
        </>

    );
}

export default App;
