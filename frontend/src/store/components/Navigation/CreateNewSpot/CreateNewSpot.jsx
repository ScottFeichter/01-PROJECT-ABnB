import './CreateNewSpot.css';
import {useState } from 'react';
import {useDispatch } from 'react-redux'
import { useModal } from '../../../context/Modal';
import * as spotsActions from '../../../spots'
import { useEffect } from 'react';

function CreateNewSpot() {

        const dispatch = useDispatch();
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [username, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [errors, setErrors] = useState({});
        const [isDisabled, setIsDisabled] = useState(true);
        const { closeModal } = useModal();


    // Log In Button Disabled------------------------------------------------------------------------


    const checkDisabled = () => {
        if(
        (firstName.length === 0 || !firstName) ||
        (lastName.length === 0 || !lastName) ||
        (email.length === 0 || !email) ||
        (username.length === 0 || !username) ||
        (password.length === 0 || !password) ||
        (confirmPassword.length === 0 || !confirmPassword) ||
        (username.length < 4) ||
        (password.length < 6)
        )
        {setIsDisabled(true) } else {setIsDisabled(false)}

       }

       useEffect(()=> {
        checkDisabled();
       });



    // Signup Button handler------------------------------------------------------------------------

        const handleSubmit = (e) => {
            e.preventDefault();
            if (confirmPassword === password) {
                setErrors({});
                // console.log('HANDLE SUBMIT RAN - SIGNUP INFO', firstName, lastName, email, username, password);
                return dispatch(spotsActions.signup({firstName, lastName, email, username, password}))
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
                confirmPassword: "Confirm Password field must be the same as the Password field"
            })
        };


// return-----------------------------------
        return (
          <main id="CreateNewSpotMain">

            <h1>Sign Up</h1>


                    <form id='CreateNewSpotForm' onSubmit={handleSubmit}>

                        <div id='firstNameContainer'>
                                <div className="errors">{errors.firstName}</div>
                                    <label className='CreateNewSpotFormLabel'>
                                        first name:
                                        <input
                                        className='CreateNewSpotFormInput'
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {errors.firstName && <p>{errors.firstName}</p>}

                            <div id='lastNameContainer'>
                                <div className="errors">{errors.lastName}</div>
                                    <label className='CreateNewSpotFormLabel'>
                                        last name:
                                        <input
                                        className='CreateNewSpotFormInput'
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {errors.lastName && <p>{errors.lastName}</p>}

                            <div id='emailContainer'>
                                <div className="errors">{errors.email}</div>
                                    <label className='CreateNewSpotFormLabel'>
                                            email:
                                        <input
                                        className='CreateNewSpotFormInput'
                                        id="email"
                                        name="email"
                                        value={email}
                                        type="text"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {errors.email && <p>{errors.email}</p>}

                            <div id='userNameContainer'>
                                <div className="errors">{errors.username}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            username:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="username"
                                            name="username"
                                            value={username}
                                            type="username"
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.username && <p>{errors.username}</p>}


                                <div id='passwordContainer'>
                                    <div className="errors">{errors.password}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            password:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="password"
                                            name="password"
                                            value={password}
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.password && <p>{errors.password}</p>}


                                <div id='confirmPasswordContainer'>
                                    <div className="errors">{errors.password}</div>
                                        <label className='CreateNewSpotFormLabel'>
                                            confirm password:
                                            <input
                                            className='CreateNewSpotFormInput'
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            type="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            />
                                        </label>
                                    </div>
                                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                                <div id="buttonContainer">
                                    <button
                                    id="CreateNewSpotButton"
                                    type="submit" disabled={isDisabled}>
                                        Sign Up
                                        </button>
                                </div>
                    </form>


          </main>

        )
    }



export default CreateNewSpot;
