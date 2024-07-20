import './CreateNewSpot.css';
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import * as spotsActions from '../../spots'
import { useEffect } from 'react';

function CreateNewSpot() {

        const dispatch = useDispatch();

        const [errors, setErrors] = useState({});
        const [isDisabled, setIsDisabled] = useState(false);

// form section 1----------------------------------------------------------
        const [country, setCountry] = useState("");
        const [streetAddress, setStreetAddress] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");
        const [latitude, setLatitude] = useState("");
        const [longitude, setLongitude] = useState("");









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
                        <section id="CreateNewSpotFormSection1">Where's your place located?
                            <p id="CreateNewSpotFromSection1P">
                            Guests will only get your exact address once they booked a reservation</p>

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

                                <div id='streetAddressContainer'>
                                    <div className="errors">{errors.streetAddress}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            Street Address:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="streetAddress"
                                            name="streetAddress"
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
                                                value={longitude}
                                                type="latitude"
                                                onChange={(e) => setLongitude(e.target.value)}
                                                required
                                                />
                                            </label>
                                        </div>
                                        {errors.longitude && <p>{errors.longitude}</p>}

                                    </section>
{/* form section 2---------------------------------------------------------- */}

                                    <section id="CreateNewSpotFormSection2">Describe your place to guests
                                        <p id="CreateNewSpotFromSection2P">
                                        Mention the best features of your space, any special amentities like
                                        fast wifi or parking, and what you love about the neighborhood.
                                        </p>



                                    </section>

{/* form section 3---------------------------------------------------------- */}

                                    <section id="CreateNewSpotFormSection3">Describe your place to guests
                                        <p id="CreateNewSpotFromSection3P">
                                        Mention the best features of your space, any special amentities like
                                        fast wifi or parking, and what you love about the neighborhood.
                                        </p>

                                        

                                    </section>






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
