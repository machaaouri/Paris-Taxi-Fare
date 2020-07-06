import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

export type NewRide = {
    duration?: number
    startTime?: string
    distance?: number
}

type Source = "duration" | "distance" | "time"

export const AddRide = (props: {submit:(ride: NewRide, close:() => void) => void}) => {
    const [show, setShow] = useState(false);
    const [ride, setRide] = useState<NewRide>({})

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, source: Source ) => {
        if(source == "distance") 
            setRide({...ride, distance: Number(event.target.value)})
        if(source == "duration") 
            setRide({...ride, duration: Number(event.target.value)})
        if(source == "time") 
            setRide({...ride, startTime: event.target.value})
    }

    // Make sure all fields are filled before submitting
    const isDisabled = () => {
        if (ride.distance == undefined) return true
        if (ride.duration == undefined) return true
        if (ride.startTime == undefined) return true

        if(ride.distance == 0 || ride.duration == 0) return true

        return false
    } 
    
    return (
        <>
            <button className="btn btn-primary" onClick={() => setShow(true)}>Add ride</button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <div className="add-ride">
                        <div className="start-time">
                            <label>Start time</label>
                            <input type="datetime-local" className="form-control" onChange={(e) => onChange(e, "time")} />
                        </div>

                        <input type="number" step="0.1" className="form-control" 
                            placeholder="Distance in MILES" 
                            onChange={(e) => onChange(e, "distance")} />

                        <input type="number" step="1" className="form-control" 
                            placeholder="Duration in SECONDES" 
                            onChange={(e) => onChange(e, "duration")} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => setShow(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-success" disabled={isDisabled()} onClick={() => props.submit(ride, () => setShow(false))}>
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


