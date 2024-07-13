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
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    if(sessionUser) return <Navigate to="/" replace={true} />

    const handleSubmit = (e) => {

        if (confirmPassword === password) {
            e.preventDefault();
            setErrors({});
            console.log('HANDLE SUBMIT RAN - SIGNUP INFO', firstName, lastName, email, userName, password);
            return dispatch(sessionActions.signupUser({firstName, lastName, email, userName, password})).catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                    console.log('CATCH DISPATCH RAN', data);
                }
            )
        } else {
            const err = new Error("Password and confirmPassword must match exactly. Please try again.");
            window.alert("Password and confirmPassword must match exactly. Please try again.");
            return err;
        }
    };

    return (<>
    <header>
        <img id='logoImg' src="" alt="logo"></img>
        <h1>search bar</h1>
        <img id='accountImg' src="" alt="account"></img>
    </header>
      <main>
        <h1>Sign Up</h1>
        <div id='formContainer'>
            <form id='signupForm' onSubmit={handleSubmit}>
             <div id='firstNameContainer'>
                    <div className="errors">{errors.firstName}</div>
                        <label>
                            email:
                            <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                        </label>
                </div>
                <div id='lastNameContainer'>
                    <div className="errors">{errors.lastName}</div>
                        <label>
                            email:
                            <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                        </label>
                </div>
                <div id='emailContainer'>
                    <div className="errors">{errors.email}</div>
                        <label>
                            email:
                            <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </label>
                 </div>
                 <div id='userNameContainer'>
                        <div className="errors">{errors.userName}</div>
                        <label>
                            userName:
                            <input
                            id="userName"
                            name="userName"
                            type="userName"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div id='passwordContainer'>
                        <div className="errors">{errors.password}</div>
                        <label>
                            password:
                            <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div id='confirmPasswordContainer'>
                        <div className="errors">{errors.password}</div>
                        <label>
                            password:
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div id="buttonContainer">
                        <button type="submit">Log In</button>
                    </div>
            </form>
        </div>
      </main>

    </>)
}

export default SignupFormPage;
