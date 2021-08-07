import moment from 'moment';
import React, { useEffect, useReducer, useContext } from 'react';
import Moment from 'react-moment';
import { FirebaseDB } from '../../firebase';
import AuthContext from '../../store/AuthContext';
import groupBy from '../../utils/GroupBy';
import Spinner from '../Spinner/Spinner';

const Listing = () => {

    const { user } = useContext(AuthContext);
    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        listing: {},
        isLoading: true
    });
    
    
    useEffect(() => {
        const sortBy = SORT_OPTIONS['CREATED_DESC'];
        const groupByCreated = groupBy(['_created'])

        const unsubscribe = FirebaseDB
            .collection('readings')
            .where('uid', '==', user.uid)
            .orderBy(sortBy.column, sortBy.direction)
            .onSnapshot((snapshot) => {
                const readings = snapshot.docs.map((doc) => ({ 
                    ...doc.data(), 
                    id: doc.id, 
                    _created: moment.unix(doc.data().timestamp).format('DD/MM/YYYY')
                }));

                setState({
                    listing: groupByCreated(readings),
                    isLoading: false
                })
            });

        return () => unsubscribe();
    }, [])


    if (state.isLoading) {
        return (
            <Spinner className="py-6" />
        )
    }


    return (
        <div className="pt-5">
            {
                Object.keys(state.listing).map((key, index) => (
                    <Group key={index} label={key} items={state.listing[key]} />
                ))
            }
        </div>
    );
}
 
export default Listing;


const SORT_OPTIONS = {
    'CREATED_ASC': { column: 'created', direction: 'asc' },
    'CREATED_DESC': { column: 'created', direction: 'desc' }
}

const Group = ({ label, items}) => {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header ftw-600">{label}</div>
            {
                items.length ? 
                    <ul className="list-group list-group-flush">
                        {
                            items.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between">
                                    <span><i className={`mdi ${item.isMedicine ? 'mdi-pill text-primary' : 'mdi-heart text-danger'}`}></i></span>
                                    {!item.isMedicine && <span>{item.systolic}/{item.diastolic}  ({item.heartrate}) </span>}
                                    <span><Moment format="HH:mm" unix>{item.created}</Moment></span>
                                </li>
                            ))
                        }
                    </ul>
                :
                    undefined
            }
            
        </div>
    )
}
