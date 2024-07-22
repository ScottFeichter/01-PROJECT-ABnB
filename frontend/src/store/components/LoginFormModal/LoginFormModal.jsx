import {useState } from 'react';
import * as sessionActions from '../../session';
import * as spotsActions from '../../spots';
import {useDispatch } from 'react-redux'
import { useModal } from '../../../context/Modal';
import { useEffect } from 'react';

import './LoginFormModal.css';

const LoginFormModal = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state=> state.session.user));
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const { closeModal } = useModal();

    // console.log('CREDENTIAL', credential, 'PASSWORD', password)

// Log In Button Disabled------------------------------------------------------------------------


    const checkDisabled = () => {
    ((credential.length > 3) && (password.length > 5)) ?
    setIsDisabled(false) :
    setIsDisabled(true)
   }

   useEffect(()=> {
    checkDisabled();
   });


// Login Button handler------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        // console.log('HANDLE SUBMIT RAN - LOGIN INFO', credential, password);

        await dispatch(sessionActions.login({credential, password}))
        .then(closeModal)
        .catch(
                async (res) => {

                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    console.log('CATCH DISPATCH RAN', data, data.errors);
                    console.log('ERRORS', errors)
                }
            );
        console.log('ERRORS', errors)
         return
    };


// Demo User Login------------------------------------------------------------------------

    const handleDemoUser = async () => {
        dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'})).then(closeModal);
        return console.log('LOGGED IN AS DEMO-LITION');
    };

// Return -------------------------------------------------------------------------------


    return (

    <main id="LoginFormModalMain">
      <h1>Log In</h1>

            <form id='loginForm' onSubmit={handleSubmit}>

                <div id='loginContainer'>
                    <div className="errors">{errors.credential}</div>
                        <label className="LoginFormModalLabel">
                            email or username:
                            <input className="LoginFormModalInput"
                            id="credential"
                            name="credential"
                            type="text"
                            // value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                            />
                        </label>
                    </div>

                    <div id='passwordContainer'>
                        <div className="errors">{errors.password}</div>
                        <label className="LoginFormModalLabel">
                            password:
                            <input className="LoginFormModalInput"
                            name="password"
                            type="password"
                            // value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkDisabled()
                                }
                            }
                            required
                            />
                        </label>
                        {errors.credential && (<p>{errors.credential}</p>)}
                    </div>

                    <div id="buttonContainer">
                        <button type="submit" id="LoginFormModalButton" disabled={isDisabled}>Log In</button>
                    </div>

                    <button type="button" id="LoginDemoUserButton" onClick={handleDemoUser}>
                        Demo User</button>


            </form>
    </main>


  )
}

export default LoginFormModal;
