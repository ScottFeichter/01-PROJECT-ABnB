import './SpotForManage.css';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReviewsBySpotId } from '../../../reviews';
import { getSpotDetailsById } from '../../../spots';
import DeleteSpotModal from "../../DeleteSpotModal";
import DeleteSpotModalButton from '../../DeleteSpotModalButton';
import SpotToManageUpdateButton from './SpotToManageUpdateButton';

function SpotForManage({spot}) {

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

    //handleUpdate-------------------
    // Using this via the SpotToManageUpdateButton

        // const handleSpotUpdate = (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     navigate('/spots/update')

        // }


    //handleDelete-------------------

        const handleSpotDelete = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }



   //return---------------------------



    return (

      <main id="spotManageMain">

        <NavLink to={`/spots/${spot.id}`} className="spotToManageNavLink" onClick={handleClick}>



            <span className="spotToManageContainer">
                <span className='spotToManageToolTipText'>{spot.name}</span>

                <img className="spotToManagePreviewImage" src={spot.previewImage} alt="preview"></img>


                <div className='spotToManageData'>
                    <div className='spotToManageDataLevelOne'>
                        <p className='spotToManageCityState'>{spot.city}, {spot.state}</p>
                        <div className='spotToManageRatingContainer'>
                            <FaStar className='spotToManageFaStar'></FaStar>
                            <p className='spotToManageAvgRating'>{rating}</p>
                        </div>

                    </div>

                    {/* <button id="spotToManageUpdateButton" onClick={handleSpotUpdate}>Update</button> */}
                    <SpotToManageUpdateButton key={spot.id} spot={spot}>Update</SpotToManageUpdateButton>



                        <button id="spotToManageUpdateHiddenButton" onClick={handleSpotDelete}>
                        <DeleteSpotModalButton
                            id="deleteSpotModalButton"
                            buttonText="Delete"
                            modalComponent={<DeleteSpotModal spot={spot} />}
                            />
                            </button>

                    <p className='spotToManagePrice'>${spot.price}/night</p>
                </div>

            </span>

        </NavLink>

    </main>
    )
}

export default SpotForManage;
