import './Spot.css';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function Spot({spot}) {

    return (

        <NavLink to={`/spots/${spot.id}`}>
        <span className="spotContainer">

            <img className="spotPreviewImage" src={spot.previewImage} alt="preview"></img>


            <div className='data'>
                <div className='dataLevelOne'>
                    <p className='spotCityState'>{spot.city}, {spot.state}</p>
                    <div className='spotRatingContainer'>
                        <FaStar className='spotFaStar'></FaStar>
                        <p className='spotAvgRating'>{spot.avgRating}</p>
                    </div>

                </div>

                <p className='spotPrice'>${spot.price}/night</p>
            </div>

        </span>
    </NavLink>
    )
}

export default Spot;
