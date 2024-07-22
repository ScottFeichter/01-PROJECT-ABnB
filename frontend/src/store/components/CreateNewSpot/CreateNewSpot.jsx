import './CreateNewSpot.css';
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as spotsActions from '../../spots'
import * as imagesActions from '../../images';
import * as reviewsActions from '../../reviews';


// const testNewSpot = {

//     description: "All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack a dull boy."
// }


function CreateNewSpot() {

        const dispatch = useDispatch();
        const navigate = useNavigate();


        const [errors, setErrors] = useState({});
        const [isDisabled, setIsDisabled] = useState(false);

// states form section 1----------------------------------------------------------
        const [country, setCountry] = useState("");
        const [streetAddress, setStreetAddress] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");
        const [latitude, setLatitude] = useState("");
        const [longitude, setLongitude] = useState("");

// states form section 2----------------------------------------------------------

        const [description, setDescription] = useState("")

// states form section 3----------------------------------------------------------

        const [title, setTitle] = useState("")

// states form section 4----------------------------------------------------------

        const [basePrice, setBasePrice] = useState("")

// states form section 5----------------------------------------------------------

        const [previewImg, setPreviewImg] = useState("")
        const [img1, setImg1] = useState("")
        const [img2, setImg2] = useState("")
        const [img3, setImg3] = useState("")
        const [img4, setImg4] = useState("")

// CreateNewSpot Button Disabled------------------------------------------------------------------------


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



// CreateNewSpot Button handler------------------------------------------------------------------------



        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('HANDLE SUBMIT NEW SPOT IS RUNNING');

            const newSpot = {
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

            let spotId;

            await dispatch(spotsActions.createSpot(newSpot))
            .then(response => {
                console.log('CREATENEWSPOT RESPONSE: ', response, 'CREATENEWSPOT THENEWSPOT: ')
                return response
            })
            .then(response => {
                console.log(`NEW SPOT CREATED`, response);
                spotId = response.payload.id;
                return response;
            })
            .then(response =>  {
                const prevImageInfo = {spotId: response.payload.id, url: previewImg, preview: true};
                return dispatch(imagesActions.addImageToSpot(prevImageInfo));
            }).then(response =>  {
                console.log('RESPONSE++++++++++++++++++++++++++++110', response)
                if(img1) {
                    const img1Info = {spotId: spotId, url: img1, preview: false};
                    return dispatch(imagesActions.addImageToSpot(img1Info));
                }
                return response;
            }).then(response =>  {
                console.log('RESPONSE++++++++++++++++++++++++++++117', response)
                if(img2) {
                    const img2Info = {spotId: spotId, url: img2, preview: false};
                    return dispatch(imagesActions.addImageToSpot(img2Info));
                }
                return response;
            }).then(response =>  {
                console.log('RESPONSE++++++++++++++++++++++++++++124', response)
                if(img3) {
                    const img3Info = {spotId: spotId, url: img1, preview: false};
                    return dispatch(imagesActions.addImageToSpot(img3Info));
                }
                return response;
            }).then(async response =>  {
                console.log('RESPONSE++++++++++++++++++++++++++++131', response)
                if(img4) {
                    const img4Info = {spotId: spotId, url: img1, preview: false};
                    return dispatch(imagesActions.addImageToSpot(img4Info));
                }
                return response;
            }).then(response => {
                console.log(`NEW SPOT IMAGES ADDED`);
                console.log('RESPONSE++++++++++++++++++++++++++++139', response)
                return response;
            }).then(response => {
                console.log('RESPONSE++++++++++++++++++++++++++++142', response)
                return dispatch(reviewsActions.getReviewsBySpotId(spotId));
            }).then(response => {
                console.log('RESPONSE++++++++++++++++++++++++++++145', response)
                return dispatch(spotsActions.getSpotDetailsById(spotId)).then(newSpot => console.log('NEWSPOT: ', newSpot));
            }).then(response => {
                console.log('RESPONSE++++++++++++++++++++++++++++148', response)
                return dispatch(spotsActions.search());
            }).then(response => {
                console.log('RESPONSE++++++++++++++++++++++++++++154', response, response.payload)
                navigate(`/spots/${spotId}`)
            });


            console.log('HANDLE SUBMIT NEW SPOT HAS FINISHED RUNNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

        }


        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     if (longitude === latitude) {
        //         setErrors({});
        //         // console.log('HANDLE SUBMIT RAN - SIGNUP INFO', country, streetAddress, city, state, latitude);
        //         return dispatch(spotsActions.signup({country, streetAddress, city, state, latitude}))
        //         .then(closeModal)
        //         .catch(
        //             async (res) => {
        //                 const data = await res.json();
        //                 if (data?.errors) setErrors(data.errors);
        //                 // console.log('CATCH DISPATCH RAN', data);
        //             }
        //         )
        //     }

        //     return setErrors({
        //         longitude: "Confirm Password field must be the same as the Password field"
        //     })
        // };


// return-----------------------------------
        return (
          <main id="CreateNewSpotMain">

            <h1>Create A New Spot</h1>


                    <form id='CreateNewSpotForm' onSubmit={handleSubmit}>

{/* form section 1---------------------------------------------------------- */}
                        <section id="CreateNewSpotFormSection1">

                            <h4 id="CreateNewSpotFormSection1H4">Where&apos;s your place located?</h4>

                            <p id="CreateNewSpotFormSection1P">
                                Guests will only get your exact address once they booked a reservation.
                            </p>

                            <div id='countryContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.country}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Country:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="country"
                                            name="country"
                                            type="text"
                                            placeholder='Country'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.country && <p>{errors.country}</p>}

                                <div id='streetAddressContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.streetAddress}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Street Address:
                                            <input
                                            className='CreateNewSpotFormInput'
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
                                    {errors.streetAddress && <p>{errors.streetAddress}</p>}

                                <div id='cityContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.city}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                                City:
                                            <input
                                            className='CreateNewSpotFormInput'
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
                                    {errors.city && <p>{errors.city}</p>}

                                <div id='stateContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.state}</div>
                                            <label className='CreateNewSpotFormLabel'>
                                                State:
                                                <input
                                                className='CreateNewSpotFormInput'
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
                                        {errors.state && <p>{errors.state}</p>}


                                    <div id='latitudeContainer' className='CreateNewSpotFormLabelInputContainer'>
                                        <div className="errors">{errors.latitude}</div>
                                            <label className='CreateNewSpotFormLabel'>
                                                Latitude:
                                                <input
                                                className='CreateNewSpotFormInput'
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
                                        {errors.latitude && <p>{errors.latitude}</p>}


                                    <div id='longitudeContainer' className='CreateNewSpotFormLabelInputContainer'>
                                        <div className="errors">{errors.latitude}</div>
                                            <label className='CreateNewSpotFormLabel'>
                                                Longitude:
                                                <input
                                                className='CreateNewSpotFormInput'
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
                                        {errors.longitude && <p>{errors.longitude}</p>}

                        </section>

                        <hr className='CreateNewSpotHr'></hr>
{/* form section 2---------------------------------------------------------- */}

                        <section id="CreateNewSpotFormSection2">

                        <h4 id="CreateNewSpotFormSection2H4">Describe your place to guests</h4>

                            <p id="CreateNewSpotFormSection2P">
                                Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                            </p>

                            <div id='descriptionContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.country}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <textarea
                                            className='CreateNewSpotFormInput'
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
                            {errors.description && <p>{errors.description}</p>}





                        </section>

                        <hr className='CreateNewSpotHr'></hr>

{/* form section 3---------------------------------------------------------- */}

                        <section id="CreateNewSpotFormSection3">

                        <h4 id="CreateNewSpotFormSection3H4">Create a title for your spot</h4>

                            <p id="CreateNewSpotFormSection3P">
                                Catch guests&apos; attention with a spot title that highlights what makes your place special.
                            </p>

                            <div id='titleContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.title}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
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
                            {errors.title && <p>{errors.title}</p>}



                        </section>

                        <hr className='CreateNewSpotHr'></hr>


{/* form section 4---------------------------------------------------------- */}

                        <section id="CreateNewSpotFormSection4">

                        <h4 id="CreateNewSpotFormSection4H4">Set a base price for your spot</h4>

                            <p id="CreateNewSpotFormSection4P">
                                Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>

                            <div id='basePriceContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.basePrice}</div>
                                        <label className='CreateNewSpotFormLabel' id="basePriceLabel">

                                            <p>$</p>
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="basePrice"
                                            name="basePrice"
                                            type="text"
                                            placeholder='Price per night (USD)'
                                            value={basePrice}
                                            onChange={(e) => setBasePrice(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.basePrice && <p>{errors.basePrice}</p>}



                        </section>

                        <hr className='CreateNewSpotHr'></hr>


{/* form section 5---------------------------------------------------------- */}

                        <section id="CreateNewSpotFormSection5">

                            <h4 id="CreateNewSpotFormSection5H4">Liven up your spot with photos</h4>

                            <p id="CreateNewSpotFormSection5P">
                                Submit a link to at least one photo to publish your spot.
                            </p>

                            <div id='previewImgContainer' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.previewImg}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            <input
                                            className='CreateNewSpotFormInput'
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

                            <div id='img1Container' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img1}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
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

                            <div id='img2Container' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img2}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
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

                            <div id='img3Container' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img3}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
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

                            <div id='img4Container' className='CreateNewSpotFormLabelInputContainer'>
                                    <div className="errors">{errors.img4}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
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

                        <hr className='CreateNewSpotHr'></hr>



{/* form button---------------------------------------------------------- */}

                        <div id="buttonContainer">
                            <button
                                id="CreateNewSpotButton"
                                type="submit"
                                disabled={isDisabled}
                                onClick={handleSubmit}
                                >Create Spot
                            </button>
                        </div>


                    </form>

          </main>

        )
    }



export default CreateNewSpot;
