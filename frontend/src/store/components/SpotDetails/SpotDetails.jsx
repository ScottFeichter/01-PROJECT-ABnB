import './SpotDetails.css';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function SpotDetails() {
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots.find((spot) => spot.id === +spotId);
    // const owner = dispatch(getOwner(spot.ownerId));



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
                    <h2>Hosted by firstName lastName</h2>
                    <p>{spot.description}</p>
                </div>
                <div id="SpotDetailsPriceContainer">
                    <div id="SpotDetailsPriceAndReviewsContainer">
                        <h4>${spot.price} night</h4>
                        <div className='spotRatingContainer'>
                            <FaStar className='spotFaStar'></FaStar>
                            <p className='spotAvgRating'>{spot.avgRating} # reviews</p>
                        </div>
                    </div>
                    <button id="SpotDetailsReserveButton">Reserve</button>

                </div>
            </section>
            <hr id="SpotDetailsHr"></hr>
            <section id="SpotDetailsReviewsSection">
                <div className='spotRatingContainer'>
                    <FaStar className='spotFaStar'></FaStar>
                    <p className='spotAvgRating'>{spot.avgRating} # reviews</p>
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
