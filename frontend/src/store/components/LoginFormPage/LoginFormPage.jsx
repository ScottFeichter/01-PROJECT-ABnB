import {useState } from 'react';
import * as sessionActions from '../../session'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import './LoginForm.css';


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state=> state.session.user));
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    if(sessionUser) return <Navigate to="/" replace={true} />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        console.log('HANDLE SUBMIT RAN - LOGIN INFO', credential, password);
        return dispatch(sessionActions.login({credential, password})).catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
                console.log('CATCH DISPATCH RAN', data);
            }
        );
    };

    return (<>

      <main>
      <h1>Log In</h1>
        <div id='formContainer'>
            <form id='loginForm' onSubmit={handleSubmit}>
                <div id='loginContainer'>
                    <div className="errors">{errors.credential}</div>
                        <label>
                            email or username:
                            <input
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
                        <label>
                            password:
                            <input
                            name="password"
                            type="password"
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

export default LoginFormPage;
