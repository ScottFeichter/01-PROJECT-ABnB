import {useState } from 'react';
import login from '../../../store/session'
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
        return dispatch(login({credential, password})).catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );
    };

    return (<>
    <header>
        <img id='logoImg' src="" alt="logo"></img>
        <h1>Log In</h1>
        <img id='accountImg' src="" alt="account"></img>

    </header>
      <main>
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
                            defaultValue="email or username"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
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
                            value={password}
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
