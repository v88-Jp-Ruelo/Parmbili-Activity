import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeToPlanted, setTimer, changeToHarvest } from "../../../redux/reducers/tileSlice";
import { reduceTotalEarnings } from "../../../redux/reducers/earningSlice";
import { PLANTS } from "../../../redux/config/constants";
import { useState} from "react";
import "./AddPlant.scss";

export default function AddPlant ({selected,set_show,set_hide }){
    const { player_info } = useSelector(state => state.users);
    const [disableButton, setDisableButton] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        let countdown = PLANTS[event.target.plant_choices.value-1].time;
        if(player_info.total_earnings >= PLANTS[event.target.plant_choices.value-1].cost){
            dispatch(changeToPlanted({tile_index: selected.index, plant_name: PLANTS[event.target.plant_choices.value-1].name, plant_id: PLANTS[event.target.plant_choices.value-1].id}));
            dispatch(reduceTotalEarnings({expense_value: PLANTS[event.target.plant_choices.value-1].cost}));
            set_hide(); 
            
            const timer = setInterval(() => {
                dispatch(setTimer({tile_index: selected.index, time_left: countdown}));
                countdown--;

                if(countdown < 0){
                    clearInterval(timer);
                    dispatch(changeToHarvest({tile_index: selected.index}));
                }
            }, 1000);
        }
    } 
    return(
        <Modal id="show_plant_modal" show={set_show} centered>
            <Modal.Body>
                <Button className="close_button" type="button" onClick={set_hide}><span className="close_icon"></span></Button>
                <form onSubmit={handleSubmit}>
                    <h2>Select a Crop to Plant</h2>
                    {PLANTS.map(plant=>(
                        <>
                            <input key={plant.id} id={plant.id}  type="radio" name="plant_choices" value={plant.id}/>
                            <label key={plant.id+100} htmlFor={plant.id} onClick={()=>{if(player_info.total_earnings >= plant.cost){setDisableButton(false);}}}>
                                <span className={plant.name+`_icon`}></span>
                                <p>{plant.time}s / {plant.cost}$ / {plant.reward}$</p>
                            </label>
                        </>))}
                    <div className="action_container">
                        <Button type="button" onClick={set_hide}>Cancel</Button>
                        <Button type="submit" disabled={disableButton}>Plant</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}