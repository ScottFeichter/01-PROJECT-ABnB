import './Spot.css';
import { FaStar } from "react-icons/fa";


function Spot({spot}) {

const spotKeys = Object.keys(spot);
const spotValues = Object.values(spot);
// const spotEntries = Object.entries(spot);
console.log(spot);


    return (

       <a href={SpotDetails} spot={spot}>
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
        </a>



    )
}

export default Spot;
