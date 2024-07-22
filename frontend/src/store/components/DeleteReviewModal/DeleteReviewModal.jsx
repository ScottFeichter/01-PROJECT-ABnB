import { useModal } from "../../../context/Modal";
import {useDispatch } from 'react-redux'
import * as spotsActions from '../../spots';
import { useNavigate } from "react-router-dom";
import "./DeleteReviewModal.css"



function DeleteReviewModal({spot}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log('SPOT!!!!!!!!!!!!!!!!', spot.id)


//  handlerDelete-------------------------------------------

    const handleDelete = (e) => {
        e.preventDefault();

        return dispatch(spotsActions.deleteReview(spot))
            .then(() => {return dispatch(spotsActions.search())})
            .then(() => {return dispatch(spotsActions.getCurrentUserReviews())})
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
        <main id="DeleteReviewModalMain">

            <h1 id="DeleteReviewModalH1">Confirm Delete</h1>
            <p id="DeleteReviewModalP">Are you sure you want to remove this spot?</p>

            <div id="DeleteReviewModalButtonContainer">

                <button
                    id="YesDeleteReviewButton"
                    name="YesDeleteReviewButton"
                    type="button"
                    onClick={handleDelete}
                >{"Yes (Delete Review)"}</button>


                <button
                    id="NoKeepReviewButton"
                    name="NoKeepReviewButton"
                    type="button"
                    onClick={handleKeep}
                >{"No (Keep Review)"}</button>

            </div>

      </main>

    )
}

export default DeleteReviewModal;
