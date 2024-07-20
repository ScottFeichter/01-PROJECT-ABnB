import './CreateNewSpot.css';
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import * as spotsActions from '../../spots'
import { useEffect } from 'react';


function CreateNewSpot() {

        const dispatch = useDispatch();

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

        const [basePrice, setBasePrice] = useState(0)

// states form section 5----------------------------------------------------------

        const [previewImg, setPreviewImg] = useState("")
        const [img1, setImg1] = useState("")
        const [img2, setImg2] = useState("")
        const [img3, setImg3] = useState("")
        const [img4, setImg4] = useState("")

// CreateNewSpot Button Disabled------------------------------------------------------------------------


    const checkDisabled = () => {
        if(
        (country.length === 0 || !country) ||
        (streetAddress.length === 0 || !streetAddress) ||
        (city.length === 0 || !city) ||
        (state.length === 0 || !state) ||
        (latitude.length === 0 || !latitude) ||
        (longitude.length === 0 || !longitude) ||
        (state.length < 4) ||
        (latitude.length < 6)
        )
        {setIsDisabled(true) } else {setIsDisabled(false)}

       }

       useEffect(()=> {
        checkDisabled();
       });



// CreateNewSpot Button handler------------------------------------------------------------------------

        const handleSubmit = (e) => {
            e.preventDefault();
            if (longitude === latitude) {
                setErrors({});
                // console.log('HANDLE SUBMIT RAN - SIGNUP INFO', country, streetAddress, city, state, latitude);
                return dispatch(spotsActions.signup({country, streetAddress, city, state, latitude}))
                .then(closeModal)
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data?.errors) setErrors(data.errors);
                        // console.log('CATCH DISPATCH RAN', data);
                    }
                )
            }

            return setErrors({
                longitude: "Confirm Password field must be the same as the Password field"
            })
        };


// return-----------------------------------
        return (
          <main id="CreateNewSpotMain">

            <h1>Create A New Spot</h1>


                    <form id='CreateNewSpotForm' onSubmit={handleSubmit}>

{/* form section 1---------------------------------------------------------- */}
                        <section id="CreateNewSpotFormSection1">Where&apos;s your place located?
                            <p id="CreateNewSpotFromSection1P">
                                Guests will only get your exact address once they booked a reservation
                            </p>

                            <div id='countryContainer'>
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

                                <div id='streetAddressContainer'>
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

                                <div id='cityContainer'>
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

                                <div id='stateContainer'>
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


                                    <div id='latitudeContainer'>
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


                                    <div id='longitudeContainer'>
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

                        <section id="CreateNewSpotFormSection2">Describe your place to guests
                            <p id="CreateNewSpotFromSection2P">
                                Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                            </p>

                            <div id='descriptionContainer'>
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

                        <section id="CreateNewSpotFormSection3">Create a title for your spot
                            <p id="CreateNewSpotFromSection3P">
                                Catch guests&apos; attention with a spot title that highlights what makes your place special.
                            </p>

                            <div id='titleContainer'>
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

                        <section id="CreateNewSpotFormSection4">Set a base price for your spot
                            <p id="CreateNewSpotFromSection4P">
                                Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>

                            <div id='basePriceContainer'>
                                    <div className="errors">{errors.basePrice}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            $
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

                        <section id="CreateNewSpotFormSection5">Liven up your spot with photos
                            <p id="CreateNewSpotFromSection5P">
                                Submit a link to at least one photo to publish your spot.
                            </p>

                            <div id='previewImgContainer'>
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

                            <div id='img1Container'>
                                    <div className="errors">{errors.img1}</div>
                                        <label className='CreateNewSpotFormLabel'>

                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="img1"
                                            name="img1"
                                            type="text"
                                            placeholder='Image URL'
                                            value={img1}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.img1 && <p>{errors.img1}</p>}

                            <div id='countryContainer'>
                                    <div className="errors">{errors.country}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Country:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="country"
                                            name="country"
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.country && <p>{errors.country}</p>}

                            <div id='countryContainer'>
                                    <div className="errors">{errors.country}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Country:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="country"
                                            name="country"
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.country && <p>{errors.country}</p>}

                            <div id='countryContainer'>
                                    <div className="errors">{errors.country}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Country:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="country"
                                            name="country"
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            />
                                        </label>
                            </div>
                            {errors.country && <p>{errors.country}</p>}



                        </section>

                        <hr className='CreateNewSpotHr'></hr>



{/* form button---------------------------------------------------------- */}

                        <div id="buttonContainer">
                            <button
                            id="CreateNewSpotButton"
                            type="submit" disabled={isDisabled}>
                                Create Spot
                                </button>
                        </div>


                    </form>

          </main>

        )
    }



export default CreateNewSpot;
