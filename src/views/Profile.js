import React, { useContext, useEffect, useReducer } from 'react';
import { FirebaseApp, FirebaseDB, FirebaseNewTimestamp } from '../firebase';

import AuthContext from '../store/AuthContext';
import toast from 'react-hot-toast';
import useUser from '../hooks/useUser';
import Spinner from '../components/Spinner/Spinner';

const ProfileScreen = () => {

    const { user } = useContext(AuthContext);
    const { isLoading, profile } = useUser(user.uid);

    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        name: user.displayName,
        dob_day: 12,
        dob_month: 12,
        dob_year: 1974,
        isSaving: false
    });

    const onClick = () => {
        setState({ isSaving: true });

        FirebaseApp
            .auth()
            .currentUser
            .updateProfile({
                displayName: state.name
            })
            .then(() => {

                FirebaseDB
                    .collection('profiles')
                    .doc(user.uid)
                    .set({ // Create If Not Exisit
                        name: state.name,
                        dob_day: state.dob_day,
                        dob_month: state.dob_month,
                        dob_year: state.dob_year,
                        updated: FirebaseNewTimestamp(),
                    }, { merge: true })
                    .then(() => {
                        toast.success('Successfully saved!')
                        setState({ isSaving: false });
                    })
                    .catch((error) => {
                        toast.error(`Companions Edit Error: ${error.toString()}`);
                        setState({ isSaving: false });
                    });

            }).catch((error) => {
                toast.error(`User Update Error: ${error.toString()}`);
            });
    }


    useEffect(() => {

        if(!isLoading){
            setState({
                name: user.displayName,
                dob_day: profile ? profile.dob_day : 1,
                dob_month: profile ? profile.dob_month : 1,
                dob_year: profile ? profile.dob_year : 1974,
            });
        }

    }, [isLoading, profile]);


    if (isLoading) {
        return (
            <Spinner className="py-6" />
        )
    }

    return (
        <div className="container pt-5 px-5">
           
           <form>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="email" className="form-control form-control-lg" value={state.name} onChange={(e) => setState({ name: e.target.value })} />
                </div>

                <div className="mb-5">
                    <label className="form-label">DOB</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control form-control-lg" placeholder="Day" value={state.dob_day} onChange={(e) => setState({ dob_day: e.target.value })} />
                        <input type="number" className="form-control form-control-lg" placeholder="Month" value={state.dob_month} onChange={(e) => setState({ dob_month: e.target.value })} />
                        <input type="number" className="form-control form-control-lg" placeholder="Year" value={state.dob_year} onChange={(e) => setState({ dob_year: e.target.value })} />
                    </div>
                </div>

                <button
                    className="w-100 btn btn-lg btn-purple py-3"
                    type="submit"
                    disabled={state.name === '' || state.isSaving ? true : false}
                    onClick={onClick}
                >
                    {state.isSaving ? <span className="spinner-border spinner-border-sm"></span> : 'Save Profile'}
                </button>


            </form>

        </div>
    );
}
 
export default ProfileScreen;