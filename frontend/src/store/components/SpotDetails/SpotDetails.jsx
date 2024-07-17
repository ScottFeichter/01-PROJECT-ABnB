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
                    <img src="" alt="img" id="SpotDetailsSpotImage-1" />
                    <img src="" alt="img" id="SpotDetailsSpotImage-2" />
                    <img src="" alt="img" id="SpotDetailsSpotImage-3" />
                    <img src="" alt="img" id="SpotDetailsSpotImage-4" />
                </div>
            </section>
            <section id="SpotDetailsHostedBySection">
                <div id="SpotDetailsHostedByTextContainer">
                    {/* <h2>Hosted by {owner.firstName} {owner.lastName}</h2> */}
                    <p>{spot.description}</p>
                </div>
                <div id="SpotDetailsPriceContainer">
                    <h4>${spot.price} night</h4>
                    <div className='spotRatingContainer'>
                        <FaStar className='spotFaStar'></FaStar>
                        <p className='spotAvgRating'>{spot.avgRating}</p>
                        <p># reviews</p>
                    </div>

                </div>
            </section>
            <section id="SpotDetailsReviewsSection">
                <div className='spotRatingContainer'>
                    <FaStar className='spotFaStar'></FaStar>
                    <p className='spotAvgRating'>{spot.avgRating}</p>
                    <p># reviews</p>
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
