import moment from 'moment';
import React, { useContext, useReducer, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FirebaseDB, FirebaseNewTimestamp } from '../firebase';
import toast from 'react-hot-toast';
import AuthContext from '../store/AuthContext';
import Listing from '../components/Listing';

const HomeScreen = () => {
    
    const inputRef = useRef(null);
    const { user } = useContext(AuthContext);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showMedsModal, setShowMedsModal] = useState(false);
    const [prevDateTime, setPrevDateTime] = useState('');

    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState
    }), {
        timestamp: null,
        systolic: 0,
        diastolic: 0,
        heartrate: 0,
        isSaving: false
    });

    
    const handleClose = () => {
        resetState();
        setShowAddModal(false);
        setShowMedsModal(false);
    };

    const handleShow = () => {
        setState({ timestamp: moment().unix() });
        setShowAddModal(true);
        setTimeout(() => {
            inputRef.current?.select();
        }, 10)
    }

    const onSubmit = (isMedicine) => {
        setState({ isSaving: true });

        const { isSaving, ...data} = state; // Remove isSaving From State

        if(isMedicine){
            data.timestamp = moment().unix();
        }

        const obj = {
            ...data,
            uid: user.uid,
            isMedicine: isMedicine ? true : false,
            created: FirebaseNewTimestamp()
        }

        if (prevDateTime !== ''){
            const _oldTimestamp = moment(prevDateTime, 'YYYY-MM-DD HH:mm').unix();
            obj.timestamp = _oldTimestamp;
            obj.created = _oldTimestamp;
        }

        FirebaseDB
            .collection('readings')
            .add({ ...obj })
            .then(() => {
                toast.success('Reading Saved');
                handleClose()
            })
            .catch((error) => {
                toast.error(`Request Error: ${error.toString()}`, 'error');
                handleClose()
            });
    }


    const resetState = () => {
        setState({
            timestamp: null,
            systolic: 0,
            diastolic: 0,
            heartrate: 0,
            isSaving: false
        })
    }

    const validation = () => {
        if(state.systolic === '' || state.systolic === 0) return true;
        if(state.diastolic === '' || state.diastolic === 0) return true;
        if(state.heartrate === '' || state.heartrate === 0) return true;

        return state.isSaving;
    }

    return (
        <>
            <div className="container pt-3 px-4">
                <div className="text-end">
                    <button type="button" className="btn btn-warning me-2" onClick={() => setShowMedsModal(true)} ><i className="mdi mdi-pill"></i></button>
                    <button type="button" className="btn btn-purple" onClick={handleShow} >Add Reading</button>
                </div>

                <Listing />
            
            </div>

            <Modal show={showAddModal} onHide={handleClose} fullscreen={false} centered >
                
                <Modal.Header closeButton>
                    <Modal.Title>Add Reading</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Input 
                        ref={null} 
                        label='Date / Time'
                        value={moment.unix(state.timestamp).format('DD MMM, YYYY - HH:mm')}
                        readOnly={true}
                        type={'text'}
                        />

                    <Input
                        type={'text'}
                        ref={null} 
                        label='Prev Date Time'
                        value={prevDateTime}
                        onChange={(e) => setPrevDateTime(e.target.value)}
                        placeholder="YYYY-MM-DD HH:mm"
                    />

                    <Input
                        ref={inputRef} 
                        label='Systolic'
                        value={state.systolic} 
                        onChange={(e) => setState({ systolic: e.target.value })}
                    />
                

                    <Input
                        ref={null} 
                        label='Diastolic'
                        value={state.diastolic}
                        onChange={(e) => setState({ diastolic: e.target.value })}
                    />

                    <Input
                        ref={null} 
                        label='Heart Rate'
                        value={state.heartrate}
                        onChange={(e) => setState({ heartrate: e.target.value })}
                    />
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="me-auto" onClick={handleClose}>Close</Button>
                    <Button variant="purple" disabled={validation()} onClick={() => onSubmit(false)}>
                        {state.isSaving ? <span className="spinner-border spinner-border-sm"></span> : 'Save Profile'}
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showMedsModal} onHide={handleClose} fullscreen={false} centered >

                <Modal.Header closeButton>
                    <Modal.Title>Add Medication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="lead">Just took your medication?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="me-auto" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={() => onSubmit(true) }>Yes, Taken</Button>
                </Modal.Footer>
            </Modal>


        </>
    );
}
 
export default HomeScreen;


const Input = React.forwardRef(({ label, value = 0, readOnly = false, type = "number", placeholder='', onChange = () => { } }, ref) => {

    const [_value, _setValue] = useState(value);

    const _onChange = (e) => {
        _setValue(e.target.value);
        onChange(e);
    }

    return (
        <div className="mb-3 row">
            <label className="col-6 col-form-label">{label}</label>
            <div className="col-6">
                <input 
                    ref={ref}
                    type={type} 
                    className={`${readOnly ? 'form-control-plaintext' : 'form-control'} text-end`} 
                    value={_value}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    onChange={_onChange } />
            </div>
        </div>
    );
})