import React, { useContext, useReducer } from 'react';
import useBodyClass from '../hooks/useBodyClass';

import { version } from '../../package.json';
import AuthContext from '../store/AuthContext';

const LoginScreen = () => {

    const { isLoggingIn, isLoggingError, doLogin } = useContext(AuthContext);

    useBodyClass('body-signin');

    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        email: '',
        password: ''
    });

    const doSignIn = () => {
        doLogin(state.email, state.password)
    }

    return (

            <form className="form-signin">

                <h2 className="mb-3 text-center">Please Sign In</h2>

                {isLoggingError ? <div className="alert alert-danger">Login Error</div> : undefined }

                <div className="form-floating">
                    <input type="email" className="form-control" id="inpemail" onChange={(e) => setState({ email: e.target.value })} placeholder="name@example.com" />
                    <label htmlFor="inpemail">Email</label>
                </div>

                <div className="form-floating mb-4">
                <input type="password" className="form-control" id="inppassword" onChange={(e) => setState({ password: e.target.value })} placeholder="Password" />
                    <label htmlFor="inppassword">Password</label>
                </div>

                <button 
                    className="w-100 btn btn-lg btn-purple py-3" 
                    type="submit" 
                    disabled={state.email === '' || state.password === '' || isLoggingIn  ? true : false}
                    onClick={doSignIn}
                >
                        {isLoggingIn ? <span className="spinner-border spinner-border-sm"></span> : 'Sign In'}
                    </button>

                <p className="text-muted m-0 py-5 text-center">&copy; My Pressure &bull; {version}</p>

            </form>
            
    );
}
 
export default LoginScreen;