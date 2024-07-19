import './Spot.css';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function Spot({spot}) {

    const [rating, setRating] = useState("");

    useEffect(()=> {
    spot.avgRating === "N/A" ? setRating("New") : setRating(spot.avgRating);
    }, [spot.avgRating]);

    return (

      <main id="spotsMain">

        <NavLink to={`/spots/${spot.id}`} className="spotNavLink">


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
