import "./Tile.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTile } from "../../redux/reducers/tileSlice";
import {PLANTS,SELL_PLANTS} from "../../redux/config/constants";
import React, { useState } from 'react';
import { Popover, Button, OverlayTrigger } from "react-bootstrap"
import { changeToTilled, changeToNull } from "../../redux/reducers/tileSlice";
import { addTotalEarnings } from '../../redux/reducers/earningSlice';
import PlantModal from "../modals/add_plant_modal/AddPlant";
import RemovePlant from '../modals/remove_plant_modal/RemovePlant';

export default function Tile({data, tile_index}){

    const dispatch = useDispatch();
    const { tile_container, active_tile } = useSelector(state => state.tiles);
    const {status, plant_name, time_left} = data;
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    

    const handleTileClick = () =>{
        dispatch(setActiveTile({index: tile_index, status: status}));
       
    }
    const setToTilled = () =>{
        dispatch(changeToTilled({tile_index: active_tile.index}));
        setShowOverlay(false);
    }

    const showPlantModal = ()=>{
        setShowModal(true);
        setShowOverlay(false);
    }

    const showRemoveModal = () =>{
        setRemoveModal(true);
        setShowOverlay(false);
    }

    const harvestPlant = () =>{
        dispatch(addTotalEarnings({earning_value: PLANTS[tile_container[active_tile.index].plant_id-1].reward}));
        dispatch(changeToNull({tile_index: active_tile.index}));
        setShowOverlay(false);
    }

    const togglePopOver = () => {
        setShowOverlay(prevState => !prevState);
    }
    

    const popover = (
        <Popover id="popover-container">
            <Popover.Body>
                {active_tile.status === "null"   ? <Button className="overlay_button" onClick={setToTilled}>Till</Button> : ""}
                {active_tile.status === "tilled"  ? <Button className="overlay_button" onClick={showPlantModal}>Plant</Button> : ""}
                {active_tile.status === "planted" ? <Button className="overlay_button remove" onClick={showRemoveModal}>Remove</Button> : ""}
                {active_tile.status === "harvest" ? <Button className="overlay_button" onClick={harvestPlant}>Harvest</Button> : ""}
                {active_tile.status === "harvest" ? <Button className="overlay_button remove" onClick={showRemoveModal}>Remove</Button> : ""}
            </Popover.Body>
        </Popover>
    );

    return(
        <>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} onToggle={togglePopOver} show={showOverlay}rootClose>
                <div className={`tile_item ${status}`} onClick={handleTileClick}>
                    {status === "harvest" || status === "planted" ?
                        <>
                            <span className={`${plant_name+"_icon" ?? ""}`}></span>
                            {time_left ? <p className="time_left">{`${time_left}s`}</p> : <p className="reward">{`${SELL_PLANTS[plant_name].harvest_Price}$`}</p>}
                        </>: ""}
                </div>
            </OverlayTrigger>
            <RemovePlant set_show={removeModal} set_hide={()=>setRemoveModal(false)} selected={active_tile}/>
            <PlantModal set_show={showModal} set_hide={()=>setShowModal(false)} selected={active_tile}/>
        </>
        
    )
}