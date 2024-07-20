import './Spot.css';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getReviewsBySpotId } from '../../reviews';
import { getSpotDetailsById } from '../../spots';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Spot({spot}) {

    const [rating, setRating] = useState("");

// configure avgRating

    useEffect(()=> {
    spot.avgRating === "N/A" ? setRating("New") : setRating(spot.avgRating);
    }, [spot.avgRating]);


// make NavLink also dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const spotDetails = await dispatch(getSpotDetailsById(spot.id))
        .then(console.log(/*'spotDetails from the NavLink!!!!!!!!!!!!!!'*/));



        const reviews = await dispatch(getReviewsBySpotId(spot.id))
        .then(console.log(/*'reviews from NavLink!!!!!!!!!!!!'*/))

        // for making linting error go away
        if(spotDetails) {reviews}

        navigate(`/spots/${spot.id}`)

    }

    return (

      <main id="spotsMain">

        <NavLink to={`/spots/${spot.id}`} className="spotNavLink" onClick={handleClick}>



            <span className="spotContainer">
                <span className='tooltiptext'>{spot.name}</span>

                <img className="spotPreviewImage" src={spot.previewImage} alt="preview"></img>


                <div className='data'>
                    <div className='dataLevelOne'>
                        <p className='spotCityState'>{spot.city}, {spot.state}</p>
                        <div className='spotRatingContainer'>
                            <FaStar className='spotFaStar'></FaStar>
                            <p className='spotAvgRating'>{rating}</p>
                        </div>

                    </div>

                    <p className='spotPrice'>${spot.price}/night</p>
                </div>

            </span>

        </NavLink>

    </main>
    )
}

export default Spot;
