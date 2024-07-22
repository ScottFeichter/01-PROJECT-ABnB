import { useModal } from "../../../context/Modal";
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import * as reviewsActions from '../../reviews'
import * as spotsActions from '../../spots';
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

    // console.log('SPOT!!!!!!!!!!!!!!!!', spot.id)



// Stars-----------
    const [firstStar, setFirstStar] = useState(true)
    const handleStar1Click = () =>{
        if(firstStar) {
            setFirstStar(true)
        } else setFirstStar(true)
    }

    const [secondStar, setSecondStar] = useState(false)
    const handleStar2Click = () =>{
        if(secondStar) {
            setSecondStar(false)
        } else setSecondStar(true)
    }

    const [thirdStar, setThirdStar] = useState(false)
    const handleStar3Click = () =>{
        if(thirdStar) {
            setThirdStar(false)
        } else setThirdStar(true)
    }


    const [fourthStar, setFourthStar] = useState(false)
    const handleStar4Click = () =>{
        if(fourthStar) {
            setFourthStar(false)
        } else setFourthStar(true)
    }


    const [fifthStar, setFifthStar] = useState(false)
    const handleStar5Click = () =>{
        if(fifthStar) {
            setFifthStar(false)
        } else setFifthStar(true)
    }

// Submit Review Button Disabled------------------------------------------------------------------------


const checkDisabled = () => {
    if(
    (review.length === 0 || !review || review.length < 10)
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

            let stars = 0;
            firstStar === true ? stars++ : stars;
            secondStar === true ? stars++ : stars;
            thirdStar === true ? stars++ : stars;
            fourthStar === true ? stars++ : stars;
            fifthStar === true ? stars++ : stars;


            return dispatch(reviewsActions.createReview({review: review, stars: stars, spotId: spot.id}))
            .then(closeModal)
            .then(() => dispatch(reviewsActions.getReviewsBySpotId(spot.id)))
            .then(() => dispatch(spotsActions.getSpotDetailsById(spot.id)))
            .then(() => dispatch(spotsActions.search()))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                    // console.log('CATCH DISPATCH RAN', data);
                    if(res.status === 500) {
                        setErrors({message: "User already has a review for this spot"})
                    } else if (res.status === 404) {
                        setErrors({messsage: "Spot couldn't be found"})
                    }
                })

        }

        return setErrors({
            // confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    };


    return (
        <main id="CreateNewReviewModalMain">

            <h1 id="CreateNewReviewModalH1">How was your stay?</h1>
            <div className="CreateReviewErrors">{errors.review}</div>
            <div className="CreateReviewErrors">{errors.message}</div>


            <form id='CreateNewReview' onSubmit={handleSubmit}>

                <div id='CreateNewReviewTextBoxContainer'>

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



                <div id="CreateNewReviewStarContainer">

                    {firstStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar1Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar1Click}/>}

                    {secondStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar2Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar2Click}/>}

                    {thirdStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar3Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar3Click}/>}

                    {fourthStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar4Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar4Click}/>}

                    {fifthStar ? <FaStar className="CreateNewReviewFaStar" onClick={handleStar5Click}/> : <CiStar className="CreateNewReviewCiStar"
                    onClick={handleStar5Click}/>}

                    {/* <p>Stars</p> */}

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
