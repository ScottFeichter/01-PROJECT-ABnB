import { useModal } from "../../../context/Modal";
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import * as reviewsActions from '../../reviews'
import { useEffect } from 'react';
import { CiStar } from "react-icons/ci";
import "./CreateNewReviewModal.css"
import { FaStar } from "react-icons/fa";




function CreateNewReviewModal({spot}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");


    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const { closeModal } = useModal();



// Stars-----------
    const [firstStar, setFirstStar] = useState(false)
    const handleStar1Click = () =>{
        if(firstStar) {
            setFirstStar(false)
        } else setFirstStar(true)
    }


    const [secondStar, setSecondStar] = useState(false)
    const handleStar2Click = () =>{
        if(firstStar) {
            setSecondStar(false)
        } else setSecondStar(true)
    }

// Submit Review Button Disabled------------------------------------------------------------------------


const checkDisabled = () => {
    if(
    (review.length === 0 || !review || review.length < 30)
    )
    {setIsDisabled(true) } else {setIsDisabled(false)}
   }

   useEffect(()=> {
    checkDisabled();
   });



// Signup Button handler-------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        if (review) {
            setErrors({});
            // console.log('HANDLE SUBMIT RAN - Create New Review);
            return dispatch(reviewsActions.createReview({review: review, spotId: spot.id}))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                    // console.log('CATCH DISPATCH RAN', data);
                }
            )
        }

        return setErrors({
            // confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    };


    return (
        <main id="CreateNewReviewModalMain">

            <h1 id="CreateNewReviewModalH1">How was your stay?</h1>


            <form id='CreateNewReview' onSubmit={handleSubmit}>

                <div id='CreateNewReviewTextBoxContainer'>
                        <div className="errors">{errors.review}</div>
                            <label className='CreateNewReviewLabel'>
                                <textarea

                                id="reviewTextArea"
                                name="reviewTextArea"
                                rows={8}
                                cols={60}
                                type="textarea"
                                placeholder="Leave your review here"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                                />
                            </label>
                </div>
                {errors.review && <p>{errors.review}</p>}


                <div id="CreateNewReviewStarContainer">

                    {firstStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar1Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar1Click}/>}

{secondStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar2Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar2Click}/>}





                    {/* <CiStar className="CreateNewReviewStar" id="CreateNewReviewStar2"/>
                    <CiStar className="CreateNewReviewStar" id="CreateNewReviewStar3"/>
                    <CiStar className="CreateNewReviewStar" id="CreateNewReviewStar4"/>
                    <CiStar className="CreateNewReviewStar" id="CreateNewReviewStar5"/> */}
                </div>






                <div id="CreateNewReviewModalButtonContainer">
                    <button
                        id="CreateNewReviewModalButton"
                        type="submit"
                        disabled={isDisabled}
                        >Submit Your Review
                    </button>
                </div>

            </form>
      </main>

    )
}

export default CreateNewReviewModal;
