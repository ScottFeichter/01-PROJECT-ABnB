import './Spot.css';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
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

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getSpotDetailsById(spot.id))
        navigate(`/spots/${spot.id}`)
        console.log('from the NavLink!!!!!!!!!!!!!!')

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
