import {useState } from 'react';
import {useDispatch } from 'react-redux'
import { useModal } from '../../../context/Modal';
import * as sessionActions from '../../session'
import { useEffect } from 'react';
import './SignupFormModal.css';


const SignupFormModal = () => {
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
            return dispatch(sessionActions.signup({firstName, lastName, email, username, password}))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                    console.log('CATCH DISPATCH RAN', data, res);
                }
            )
        }

        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
      <main id="SignupFormModalMain">

        <h1>Sign Up</h1>


                <form id='SignupForm' onSubmit={handleSubmit}>

                    <div id='firstNameContainer'>
                            <div className="SignUpFormErrors">{errors.firstName}</div>
                                <label className='SignupFormLabel'>
                                    first name:
                                    <input
                                    className='SignupFormInput'
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    />
                                </label>
                            </div>
                            {/* {errors.firstName && <p>{errors.firstName}</p>} */}

                        <div id='lastNameContainer'>
                            <div className="SignUpFormErrors">{errors.lastName}</div>
                                <label className='SignupFormLabel'>
                                    last name:
                                    <input
                                    className='SignupFormInput'
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    />
                                </label>
                            </div>
                            {/* {errors.lastName && <p>{errors.lastName}</p>} */}

                        <div id='emailContainer'>
                            <div className="SignUpFormErrors">{errors.email}</div>
                                <label className='SignupFormLabel'>
                                        email:
                                    <input
                                    className='SignupFormInput'
                                    id="email"
                                    name="email"
                                    value={email}
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    />
                                </label>
                            </div>
                            {/* {errors.email && <p>{errors.email}</p>} */}

                        <div id='userNameContainer'>
                            <div className="SignUpFormErrors">{errors.username}</div>
                                    <label className='SignupFormLabel'>
                                        username:
                                        <input
                                        className='SignupFormInput'
                                        id="username"
                                        name="username"
                                        value={username}
                                        type="username"
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {/* {errors.username && <p>{errors.username}</p>} */}


                            <div id='passwordContainer'>
                                <div className="SignUpFormErrors">{errors.password}</div>
                                    <label className='SignupFormLabel'>
                                        password:
                                        <input
                                        className='SignupFormInput'
                                        id="password"
                                        name="password"
                                        value={password}
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {/* {errors.password && <p>{errors.password}</p>} */}


                            <div id='confirmPasswordContainer'>
                                <div className="SignUpFormErrors">{errors.confirmPassword}</div>
                                    <label className='SignupFormLabel'>
                                        confirm password:
                                        <input
                                        className='SignupFormInput'
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        />
                                    </label>
                                </div>
                                {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}

                            <div id="buttonContainer">
                                <button
                                    id="SignupFormModalButton"
                                    type="submit"
                                    disabled={isDisabled}
                                    >Sign Up
                                </button>
                            </div>
                </form>


      </main>

    )
}

export default SignupFormModal;
