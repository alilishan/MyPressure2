import React, { useEffect, useReducer } from 'react';

import AuthContext from './AuthContext';
import { FirebaseApp } from '../firebase';

const Auth = ({ children }) => {
    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        isVerifying: true,
        isLoggingIn: false,
        isLoggingOut: false,
        isLoggingError: false,
        isAuthenticated: false,
        user: {}
    });

    useEffect(() => {

        FirebaseApp
            .auth()
            .onAuthStateChanged((user) => {
                console.log('App State', user); 
                if (user) {
                    setState({
                        user,
                        isAuthenticated: true,
                        isLoggingIn: false,
                        isLoggingOut: false,
                        isVerifying: false
                    });
                } else {
                    setState({
                        user: {},
                        isAuthenticated: false,
                        isLoggingIn: false,
                        isLoggingOut: false,
                        isVerifying: false
                    });
                }
            });

    }, []);

    const Login = (email, password) => {
        setState({
            isLoggingIn: true,
            isLoggingError: false
        });

        /* FirebaseApp
            .auth()
            .signInAnonymously()
            .then(() => {
                console.log('Login Successfully')
            })
            .catch((error) => {
                // Handle Errors here. var errorCode = error.code; var errorMessage = error.message;
                console.log(`LoginAnonymously Error: ${error.toString()}`);
            }); */

        FirebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error)
                setState({
                    isLoggingIn: false,
                    isLoggingError: true
                });
            });
    }

    const Logout = (callback) => {
        FirebaseApp
            .auth()
            // .currentUser
            // .delete()
            .signOut()
            .then(() => {
                console.log('Logged Out Successfully');
                if(typeof callback === 'function') callback();
            }).catch((error) => {
                console.log(`Logout Error: ${error.toString()}`);
            });
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            setState: setState,
            doLogin: Login,
            doLogout: Logout
        }}>
            { children }
        </AuthContext.Provider>        
    );
}
 
export default Auth;