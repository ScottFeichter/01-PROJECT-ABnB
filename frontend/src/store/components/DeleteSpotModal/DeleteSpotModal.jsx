import { useModal } from "../../../context/Modal";
import {useDispatch } from 'react-redux'
import * as spotsActions from '../../spots';
import { useNavigate } from "react-router-dom";
import "./DeleteSpotModal.css"



function DeleteSpotModal({spot}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log('SPOT!!!!!!!!!!!!!!!!', spot.id)


//  handlerDelete-------------------------------------------

    const handleDelete = (e) => {
        e.preventDefault();

        return dispatch(spotsActions.deleteSpot(spot))
            .then(() => {return dispatch(spotsActions.search())})
            .then(() => {return dispatch(spotsActions.getCurrentUserSpots())})
            .then(()=> closeModal())
    };


//  handlerKeep-------------------------------------------


    const handleKeep = (e) => {
        e.preventDefault();
        closeModal()
        return
    };



//  return-------------------------------------------
    return (
        <main id="DeleteSpotModalMain">

            <h1 id="DeleteSpotModalH1">Confirm Delete</h1>
            <p id="DeleteSpotModalP">Are you sure you want to remove this spot?</p>

            <div id="DeleteSpotModalButtonContainer">

                <button
                    id="YesDeleteSpotButton"
                    name="YesDeleteSpotButton"
                    type="button"
                    onClick={handleDelete}
                >{"Yes (Delete Spot)"}</button>


                <button
                    id="NoKeepSpotButton"
                    name="NoKeepSpotButton"
                    type="button"
                    onClick={handleKeep}
                >{"No (Keep Spot)"}</button>

            </div>

      </main>

    )
}

export default DeleteSpotModal;
