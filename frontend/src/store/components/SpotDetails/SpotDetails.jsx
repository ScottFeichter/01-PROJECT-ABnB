import './SpotDetails.css';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getReviewsBySpotId } from '../../reviews';
import { getSpotDetailsById } from '../../spots';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function SpotDetails() {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots.find((spot) => spot.id === +spotId);
    const tehspot = useSelector(state => state.spots.spot)
    console.log('!!!!!!!!!!!!!!', tehspot)
    console.log("spot!!!!!!!!!!!!!!!!", spot)
    const [spotOwner, setSpotOwner] = useState();
    const [reviewsShow, setReviewsShow] = useState();
    let spotDetails = useRef(0);

//get Spot Details----------------------------------
   useEffect(()=>{
    const getSpotDetails = async () => {
        spotDetails = await dispatch(getSpotDetailsById(spotId));
        const owner = spotDetails.Owner;
        console.log(spotDetails);
        setSpotOwner(spotDetails.Owner);
        console.log(spotOwner)
        const spotOwnerFirstName = owner.firstName;
        console.log(spotOwnerFirstName)
        const spotOwnerLastName = owner.lastName;
        console.log(spotOwnerLastName)
    }
    getSpotDetails()
   }, [])

   console.log('SpotDetails', spotDetails);


// getReviews---------------------------------------
    useEffect(() => {
        const getReviews = async () => {
            const response = await dispatch(getReviewsBySpotId(spotId));
            console.log('response========', response)

            const reviews = response.Reviews.length;
            console.log('reviews============', reviews);

            if(response.Reviews.length === 1) {
                setReviewsShow(`${spot.avgRating}  •  ${response.Reviews.length} Review`);
            } else if (!response.Reviews.length) {
                setReviewsShow(`\xa0\xa0\xa0 New`)
            } else {
                setReviewsShow(`${spot.avgRating}  •  ${response.Reviews.length} Reviews`);
            }
        }
        getReviews()
    }, []);



// handleReserve---------------------------------------

    const handleReserve = (e) => {
        e.preventDefault();
        window.alert("Feature coming soon");
    }

// return---------------------------------------

    return (
        <main id="SpotDetailsMain">

            <h1 id="SpotDetailsH1">{spot.name}</h1>
            <h3 id="SpotDetailsH3">{spot.city}, {spot.state}, {spot.country}</h3>

            <section id="SpotDetailsImagesSection">
                <img src={spot.previewImage} alt="img" id="SpotDetailsPreviewImage" />
                <div id="SpotDetailsImageGrid">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-1" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-2" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-3" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/San_Diego_Zoo_Entrance_.jpg/1200px-San_Diego_Zoo_Entrance_.jpg" alt="img" id="SpotDetailsSpotImage-4" />
                </div>
            </section>

            <section id="SpotDetailsHostedBySection">

                <div id="SpotDetailsHostedByTextContainer">
                    <h2>Hosted by  lastName</h2>
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
                    {}
                </div>


                <p>Here will be a review</p>
                <p>Here will be another review</p>
                <p>Here will be still another review</p>
                <p>And indeed one more review</p>
            </section>
        </main>

    )


}

export default SpotDetails;
