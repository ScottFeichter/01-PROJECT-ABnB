import {useState } from 'react';
import * as sessionActions from '../../session'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import './SignupFormPage.css';


const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state=> state.session.user));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    if(sessionUser) return <Navigate to="/" replace={true} />

    const handleSubmit = (e) => {
        e.preventDefault();
        if (confirmPassword === password) {
            setErrors({});
            console.log('HANDLE SUBMIT RAN - SIGNUP INFO', firstName, lastName, email, username, password);
            return dispatch(sessionActions.signup({firstName, lastName, email, username, password})).catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                    console.log('CATCH DISPATCH RAN', data);
                }
            )
        }

        window.alert("Password and confirmPassword must match exactly. Please try again.");
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    };

    return (<>
      <main>
      <h1>Sign Up</h1>
        <div id='formContainer'>
            <form id='signupForm' onSubmit={handleSubmit}>
             <div id='firstNameContainer'>
                    <div className="errors">{errors.firstName}</div>
                        <label>
                            first name:
                            <input
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
                        <label>
                            last name:
                            <input
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
                          <label>
                                email:
                              <input
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
                            <label>
                                username:
                                <input
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
                            <label>
                                password:
                                <input
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
                            <label>
                                confirm password:
                                <input
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
                        <button type="submit">Log In</button>
                    </div>
            </form>
        </div>
      </main>

    </>)
}

export default SignupFormPage;
