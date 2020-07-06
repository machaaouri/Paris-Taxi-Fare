import * as React from 'react';
import { AddRide, NewRide } from './add.ride';

export const TopSection = (props: {submit:(ride: NewRide, close:() => void) => void}) => {
    return (
        <div className="top">
            <h4>Taxi fare dashboard</h4>
            <AddRide {...props}/>
        </div>
    )
}