import './SpotDetails.css';
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Review from '../Review/Review';


function SpotDetails() {
    const spot = useSelector(state => state.spots.spotDetail);
    const reviews = useSelector(state => state.reviews.reviews.Reviews);


// prepare reviews for display---------------------------------------

    const [reviewsShow, setReviewsShow] = useState();

    useEffect(() => {
        const getReviews = async () => {

            if(reviews.length === 1) {
                setReviewsShow(`${spot.avgStarRating}  •  ${reviews.length} Review`);
            } else if (!reviews.length) {
                setReviewsShow(`\xa0\xa0\xa0 New`)
            } else {
                setReviewsShow(`${spot.avgStarRating}  •  ${reviews.length} Reviews`);
            }
        }
        getReviews()
    },[]);



// handleReserve---------------------------------------

    const handleReserve = (e) => {
        e.preventDefault();
        window.alert("Feature coming soon");
    }

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
                    {reviews ?
                     reviews.map(review => <Review review={review} key={review.id} />) :
                     <p>sorry, no reviews</p> }
                </div>

            </section>
        </main>

    )


}

export default SpotDetails;
