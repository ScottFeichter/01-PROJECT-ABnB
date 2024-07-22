import './SpotDetails.css';
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Review from '../Review/Review';
import CreateNewReviewModal from '../CreateNewReviewModal/CreateNewReviewModal';
import CreateReviewModalButton from '../CreateReviewModalButton/CreateReviewModalButton';



function SpotDetails() {
    const spot = useSelector(state => state.spots.spotDetail);
    const preReviews = useSelector(state => state.reviews.reviews);
    let reviews;
    let reviewsInOrder;

    console.log("previewReviews.Reviews!!!!!!!!!!!!!!!!!", preReviews.Reviews);

    if(!preReviews || !preReviews.Reviews) {
        reviews = [];
        reviewsInOrder = false;
    } else if (preReviews.Reviews.length) {
        reviews = preReviews.Reviews;
        reviewsInOrder = reviews.sort((a, b) => a.createdAt - b.createdAt);
        console.log("Reviews in order", reviewsInOrder);
    }


// handleReserve---------------------------------------

    const handleReserve = (e) => {
        e.preventDefault();
        window.alert("Feature coming soon");
    }


// prepare reviews for display---------------------------------------

    const [reviewsShow, setReviewsShow] = useState();

    useEffect(() => {
        const getReviews = () => {
            if(reviews === undefined){
                setReviewsShow(`\xa0\xa0\xa0 New`)
            } else if(!reviews.length) {
                setReviewsShow(`\xa0\xa0\xa0 New`)
            } else if(reviews.length === 1) {
                setReviewsShow(`${spot.avgStarRating}  •  ${reviews.length} Review`);
            } else {
                setReviewsShow(`${spot.avgStarRating}  •  ${reviews.length} Reviews`);
            }
        }
        getReviews()
    },[reviews, spot.avgStarRating]);


// check if post review button should show --------------------------------------


    const [postReviewButton, setPostReviewButton] = useState(false);
    const session = useSelector(state => state.session.user);

    let sessionBool;
    if(session === null) {
        sessionBool = false;
    } else {
        sessionBool = true;
    }

    let isSame;
    if (session === null) {
        isSame = false
    } else {
        isSame = spot.ownerId === session.id;
    }

    let alreadyPosted;
    if(session === null) {
        alreadyPosted = false;
    } else {
        if(reviewsInOrder) {alreadyPosted = reviewsInOrder.some(review => review.userId === session.id);} else {alreadyPosted = false}
    }

    // console.log('THREE POS: ', sessionBool, isSame, alreadyPosted)


    useEffect(()=> {
        setPostReviewButton(((sessionBool)&&(!isSame)&&(!alreadyPosted)));
        console.log('POST REVIEW BUTTON', postReviewButton);
    }, [])


    let reviewsMessage = "";

    postReviewButton ? reviewsMessage = "Be the first to post a review!" : reviewsMessage = "";








// return---------------------------------------

    // console.log('SPOT DETAILS COMPONENT RAN');
    return (
        <main id="SpotDetailsMain">

            <h1 id="SpotDetailsH1">{spot.name}</h1>
            <h3 id="SpotDetailsH3">{spot.city}, {spot.state}, {spot.country}</h3>

            <section id="SpotDetailsImagesSection">
                <img src={spot.SpotImages[0].url} alt="img" id="SpotDetailsPreviewImage" />
                <div id="SpotDetailsImageGrid">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-1" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-2" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-3" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-4" />
                </div>
            </section>

            <section id="SpotDetailsHostedBySection">

                <div id="SpotDetailsHostedByTextContainer">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>

                <div id="SpotDetailsPriceContainer">
                    <div id="SpotDetailsPriceAndReviewsContainer">
                        <h4>${spot.price} night</h4>
                        <div className='spotDetailsRatingContainer'>
                            <FaStar className='spotFaStar'></FaStar>
                            <p className='spotAvgRating'>{reviewsShow}</p>
                        </div>
                    </div>

                    <button id="SpotDetailsReserveButton" onClick={handleReserve}>Reserve</button>
                </div>
            </section>

            <hr id="SpotDetailsHr"></hr>
            <section id="SpotDetailsReviewsSection">
                <div className='spotRatingContainer'>
                    <FaStar className='spotFaStar'></FaStar>
                    <p className='spotAvgRating'>{reviewsShow}</p>
                </div>

                <div id="SpotDetailsReviews">



                    {postReviewButton &&
                        <CreateReviewModalButton
                          buttonText="Post Your Review"
                          modalComponent={<CreateNewReviewModal spot={spot} />}
                          />
                    }


                    {reviewsInOrder ?
                     reviewsInOrder.map(review => <Review review={review} key={review.id} />) :
                     <p>{reviewsMessage}</p> }

                </div>

            </section>
        </main>

    )


}

export default SpotDetails;
