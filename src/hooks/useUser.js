import { useEffect, useReducer } from "react";
import { FirebaseDB } from "../firebase";


const useUser = (id) => {

    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        isLoading: true,
        isError: false,
        profile: {}
    });

    useEffect(() => {

        FirebaseDB
            .collection('profiles')
            .doc(id)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();
                
                setState({
                    isLoading: false,
                    isError: false,
                    profile: data ? {...data} : null
                })
                
            })
            .catch((error) => {
                setState({
                    isLoading: true,
                    isError: true,
                    profile: {}
                });

                console.error(error)
            });

    }, [id])

    return ({...state});
}
 
export default useUser;