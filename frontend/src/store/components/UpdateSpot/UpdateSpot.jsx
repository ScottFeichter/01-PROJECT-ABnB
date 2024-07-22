import './UpdateSpot.css';
import {useState } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as spotsActions from '../../spots'
// import * as imagesActions from '../../images';
import * as reviewsActions from '../../reviews';


// const testNewSpot = {

//     description: "All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy."
// }


function UpdateSpot() {

        //getting the spot to update for pre fill
        let { spotId } = useParams();
        const spotsCurrentUser = useSelector(state => state.spots.spotsCurrentUser);
        const spot = spotsCurrentUser.find(spot => spot.id === +spotId)




        const dispatch = useDispatch();
        const navigate = useNavigate();


        const [errors, setErrors] = useState({});
        // const [isDisabled, setIsDisabled] = useState(false);

// states form section 1----------------------------------------------------------
        const [country, setCountry] = useState(spot.country);
        const [streetAddress, setStreetAddress] = useState(spot.address);
        const [city, setCity] = useState(spot.city);
        const [state, setState] = useState(spot.state);
        const [latitude, setLatitude] = useState(spot.lat);
        const [longitude, setLongitude] = useState(spot.lng);

// states form section 2----------------------------------------------------------

        const [description, setDescription] = useState(spot.description)

// states form section 3----------------------------------------------------------

        const [title, setTitle] = useState(spot.name)

// states form section 4----------------------------------------------------------

        const [basePrice, setBasePrice] = useState(spot.price)

// states form section 5----------------------------------------------------------

        // const [previewImg, setPreviewImg] = useState(spot.previewImage)
        // const [img1, setImg1] = useState("")
        // const [img2, setImg2] = useState("")
        // const [img3, setImg3] = useState("")
        // const [img4, setImg4] = useState("")

// UpdateSpot Button Disabled------------------------------------------------------------------------


    // const checkDisabled = () => {
    //     if(
    //     (country.length === 0 || !country) ||
    //     (streetAddress.length === 0 || !streetAddress) ||
    //     (city.length === 0 || !city) ||
    //     (state.length === 0 || !state) ||
    //     (latitude.length === 0 || !latitude) ||
    //     (longitude.length === 0 || !longitude) ||
    //     (state.length < 4) ||
    //     (latitude.length < 6)
    //     )
    //     {setIsDisabled(true) } else {setIsDisabled(false)}

    //    }

    //    useEffect(()=> {
    //     checkDisabled();
    //    });



// UpdateSpot Button handler------------------------------------------------------------------------



        const handleSubmit = async (e) => {
            e.preventDefault();
            // console.log('HANDLE SUBMIT UPDATED SPOT IS RUNNING');

            if(!country) {
                setErrors({country: "Country is required"})
                return;
            }

            if(!description) {
                setErrors({description: "You must provide a description"})
                return;
            }

            if(description.length < 10){
                setErrors({description: "Please provide a longer description"})
                return;
            }

            if(!title){
                setErrors({title: "Please provide a title"})
                return;
            }

            if(!basePrice){
                setErrors({price: "Please provide a price"})
                return;
            }

            // if(!previewImg) {
            //     setErrors({previewImg: "A preview image is required"});
            //     return;
            // }

            const updatedSpot = {
                "address": streetAddress,
                "city": city,
                "state": state,
                "country": country,
                "lat": +latitude,
                "lng": +longitude,
                "name": title,
                "description": description,
                "price": +basePrice,
            }

            const editedSpot = {spotId: spot.id, updatedSpot: updatedSpot}

            await dispatch(spotsActions.editSpot(editedSpot))
            .then(response => {
                // console.log(`UPDATED SPOT CREATED`, response);
                return response;
            }).then(response => {
                // console.log('RESPOMSE.ID INSIDE 117 UPDATESPOT', response.id, response)
                return dispatch(reviewsActions.getReviewsBySpotId(response.payload.id));

            }).then(response => {
                response
                // console.log('RESPOMSE.ID INSIDE 120 UPDATESPOT', response.payload.id, response);
                return dispatch(spotsActions.getSpotDetailsById(spot.id));
            }).then(response => {
                // console.log('RESPONSE 120', response)
                dispatch(spotsActions.search());
                return response;
            }).then(response => navigate(`/spots/${response.payload.id}`));


            // console.log('HANDLE SUBMIT UPDATED SPOT HAS FINISHED RUNNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

        }


        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     if (longitude === latitude) {
        //         setErrors({});
        //         // // console.log('HANDLE SUBMIT RAN - SIGNUP INFO', country, streetAddress, city, state, latitude);
        //         return dispatch(spotsActions.signup({country, streetAddress, city, state, latitude}))
        //         .then(closeModal)
        //         .catch(
        //             async (res) => {
        //                 const data = await res.json();
        //                 if (data?.errors) setErrors(data.errors);
        //                 // // console.log('CATCH DISPATCH RAN', data);
        //             }
        //         )
        //     }

        //     return setErrors({
        //         longitude: "Confirm Password field must be the same as the Password field"
        //     })
        // };


// return-----------------------------------
        return (
          <main id="UpdateSpotMain">

            <h1 id="UpdateSpotH1">Update A Spot</h1>


                    <form id='UpdateSpotForm' onSubmit={handleSubmit}>

{/* form section 1---------------------------------------------------------- */}
                        <section id="UpdateSpotFormSection1">

                            <h4 id="UpdateSpotFormSection1H4">Where&apos;s your place located?</h4>

                            <p id="UpdateSpotFormSection1P">
                                Guests will only get your exact address once they booked a reservation.
                            </p>

                            <div id='countryContainer' className='UpdateSpotFormLabelInputContainer'>

                                        <label className='UpdateSpotFormLabel'>
                                            Country:
                                            <input
                                            className='UpdateSpotFormInput'
                                            id="country"
                                            name="country"
                                            type="text"

                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.country && <p className='UpdateSpotErrors'>{errors.country}</p>}

                                <div id='streetAddressContainer' className='UpdateSpotFormLabelInputContainer'>

                                        <label className='UpdateSpotFormLabel'>
                                            Street Address:
                                            <input
                                            className='UpdateSpotFormInput'
                                            id="streetAddress"
                                            name="streetAddress"
                                            placeholder='Address'
                                            value={streetAddress}
                                            type="text"
                                            onChange={(e) => setStreetAddress(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.address && <p className='UpdateSpotErrors'>{errors.address}</p>}

                                <div id='cityContainer' className='UpdateSpotFormLabelInputContainer'>

                                        <label className='UpdateSpotFormLabel'>
                                                City:
                                            <input
                                            className='UpdateSpotFormInput'
                                            id="city"
                                            name="city"
                                            placeholder='City'
                                            value={city}
                                            type="text"
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.city && <p className='UpdateSpotErrors'>{errors.city}</p>}

                                <div id='stateContainer' className='UpdateSpotFormLabelInputContainer'>

                                            <label className='UpdateSpotFormLabel'>
                                                State:
                                                <input
                                                className='UpdateSpotFormInput'
                                                id="state"
                                                name="state"
                                                placeholder='STATE'
                                                value={state}
                                                type="state"
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                                />
                                            </label>
                                        </div>
                                        {errors.state && <p className='UpdateSpotErrors'>{errors.state}</p>}


                                    <div id='latitudeContainer' className='UpdateSpotFormLabelInputContainer'>

                                            <label className='UpdateSpotFormLabel'>
                                                Latitude:
                                                <input
                                                className='UpdateSpotFormInput'
                                                id="latitude"
                                                name="latitude"
                                                placeholder='Latitude'
                                                value={latitude}
                                                type="latitude"
                                                onChange={(e) => setLatitude(e.target.value)}
                                                required
                                                />
                                            </label>
                                        </div>



                                    <div id='longitudeContainer' className='UpdateSpotFormLabelInputContainer'>

                                            <label className='UpdateSpotFormLabel'>
                                                Longitude:
                                                <input
                                                className='UpdateSpotFormInput'
                                                id="longitude"
                                                name="longitude"
                                                placeholder='Longitude'
                                                value={longitude}
                                                type="latitude"
                                                onChange={(e) => setLongitude(e.target.value)}
                                                required
                                                />
                                            </label>
                                        </div>


                        </section>

                        <hr className='UpdateSpotHr'></hr>
{/* form section 2---------------------------------------------------------- */}

                        <section id="UpdateSpotFormSection2">

                        <h4 id="UpdateSpotFormSection2H4">Describe your place to guests</h4>

                            <p id="UpdateSpotFormSection2P">
                                Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                            </p>

                            <div id='descriptionContainer' className='UpdateSpotFormLabelInputContainer'>

                                        <label className='UpdateSpotFormLabel'>

                                            <textarea
                                            className='UpdateSpotFormInput'
                                            id="description"
                                            name="description"
                                            rows={8}
                                            cols={40}
                                            type="text-area"
                                            placeholder="Please write at least 30 characters"
                                            value={description}

                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.description && <p className='UpdateSpotErrors'>{errors.description}</p>}





                        </section>

                        <hr className='UpdateSpotHr'></hr>

{/* form section 3---------------------------------------------------------- */}

                        <section id="UpdateSpotFormSection3">

                        <h4 id="UpdateSpotFormSection3H4">Create a title for your spot</h4>

                            <p id="UpdateSpotFormSection3P">
                                Catch guests&apos; attention with a spot title that highlights what makes your place special.
                            </p>

                            <div id='titleContainer' className='UpdateSpotFormLabelInputContainer'>

                                        <label className='UpdateSpotFormLabel'>

                                            <input
                                            className='UpdateSpotFormInput'
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder='Name of your spot'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.title && <p className='UpdateSpotErrors'>{errors.title}</p>}



                        </section>

                        <hr className='UpdateSpotHr'></hr>


{/* form section 4---------------------------------------------------------- */}

                        <section id="UpdateSpotFormSection4">

                        <h4 id="UpdateSpotFormSection4H4">Set a base price for your spot</h4>

                            <p id="UpdateSpotFormSection4P">
                                Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>

                            <div id='UpdateSpotBasePriceContainer' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.basePrice}</div>
                                        <label className='UpdateSpotFormLabel' id="UpdateSpotBasePriceLabel">

                                            <p>$</p>
                                            <input
                                            className='UpdateSpotFormInput'
                                            id="UpdateSpotBasePrice"
                                            name="basePrice"
                                            type="text"
                                            placeholder='Price per night (USD)'
                                            value={basePrice}
                                            onChange={(e) => setBasePrice(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.price && <p className='UpdateSpotErrors'>{errors.price}</p>}



                        </section>

                        <hr className='UpdateSpotHr'></hr>


{/* form section 5---------------------------------------------------------- */}

                        {/* <section id="UpdateSpotFormSection5">

                            <h4 id="UpdateSpotFormSection5H4">Liven up your spot with photos</h4>

                            <p id="UpdateSpotFormSection5P">
                                Submit a link to at least one photo to publish your spot.
                            </p>

                            <div id='previewImgContainer' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.previewImg}</div>
                                        <label className='UpdateSpotFormLabel'>
                                            <input
                                            className='UpdateSpotFormInput'
                                            id="previewImg"
                                            name="previewImg"
                                            type="text"
                                            placeholder='Preview Image URL'
                                            value={previewImg}
                                            onChange={(e) => setPreviewImg(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.previewImg && <p>{errors.previewImg}</p>}

                            <div id='img1Container' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img1}</div>
                                        <label className='UpdateSpotFormLabel'>

                                            <input
                                            className='UpdateSpotFormInput'
                                            id="img1"
                                            name="img1"
                                            type="text"
                                            placeholder='Image URL'
                                            value={img1}
                                            onChange={(e) => setImg1(e.target.value)}

                                            />
                                        </label>
                            </div>
                            {errors.img1 && <p>{errors.img1}</p>}

                            <div id='img2Container' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img2}</div>
                                        <label className='UpdateSpotFormLabel'>

                                            <input
                                            className='UpdateSpotFormInput'
                                            id="img2"
                                            name="img2"
                                            type="text"
                                            placeholder='Image URL'
                                            value={img2}
                                            onChange={(e) => setImg2(e.target.value)}

                                            />
                                        </label>
                            </div>
                            {errors.img2 && <p>{errors.img2}</p>}

                            <div id='img3Container' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img3}</div>
                                        <label className='UpdateSpotFormLabel'>

                                            <input
                                            className='UpdateSpotFormInput'
                                            id="img3"
                                            name="img3"
                                            type="text"
                                            placeholder='Image URL'
                                            value={img3}
                                            onChange={(e) => setImg3(e.target.value)}

                                            />
                                        </label>
                            </div>
                            {errors.img3 && <p>{errors.img3}</p>}

                            <div id='img4Container' className='UpdateSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img4}</div>
                                        <label className='UpdateSpotFormLabel'>

                                            <input
                                            className='UpdateSpotFormInput'
                                            id="img4"
                                            name="img4"
                                            type="text"
                                            placeholder='Image URL'
                                            value={img4}
                                            onChange={(e) => setImg4(e.target.value)}

                                            />
                                        </label>
                            </div>
                            {errors.img4 && <p>{errors.img4}</p>}



                        </section>

                        <hr className='UpdateSpotHr'></hr> */}



{/* form button---------------------------------------------------------- */}

                        <div id="buttonContainer">
                            <button
                                id="UpdateSpotButton"
                                type="submit"
                                onClick={handleSubmit}
                                >Update Spot
                            </button>
                        </div>


                    </form>

          </main>

        )
    }



export default UpdateSpot;
