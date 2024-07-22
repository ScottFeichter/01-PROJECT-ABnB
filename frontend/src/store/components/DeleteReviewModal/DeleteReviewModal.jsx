import { useModal } from "../../../context/Modal";
import {useDispatch } from 'react-redux'
import * as reviewsActions from '../../reviews';
import "./DeleteReviewModal.css"



function DeleteReviewModal({review}) {
    console.log('REVEIW FROM DELETE REVIEW MODAL 9', review);

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // console.log('SPOT!!!!!!!!!!!!!!!!', spot.id)


//  handlerDelete-------------------------------------------

    const handleDelete = (e) => {
        e.preventDefault();

        return dispatch(reviewsActions.deleteReview(review))
            .then(() => {return dispatch(reviewsActions.getReviewsByCurrent(review.userId))})
            .then(() => {return dispatch(reviewsActions.getReviewsBySpotId(review.spotId))})
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
            <p id="DeleteReviewModalP">Are you sure you want to remove this review?</p>

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
