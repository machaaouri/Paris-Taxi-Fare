import * as React from 'react';
import { Ride, TaxiRide } from '../../types/types';
import { price } from '../price';

export const RideComponent = (props: TaxiRide & {onClick:(id: number, msg: string) => void}) => {

    const cls = "ride " + (props.distance > 2 ? "red" : "")

    const alertMsg = () => {
        let toHHMMSS = new Date(1000 * props.duration).toISOString().substr(11, 8)
        let endTime  = new Date(new Date(props.startTime).getTime() + props.duration);
        return toHHMMSS + ' - ' + endTime.toISOString()
    }

    return (
        <div className={cls} onClick={() => props.onClick(props.id, alertMsg())}>
            <span>Id: {props.id} 
                <strong> {props.clicked && "clicked"} </strong>
            </span>
            <span>Start: {props.startTime}</span>
            <span>Duration: {props.duration}</span>
            <span>Distance: {props.distance}</span>
            <span>Distance: {props.distance}</span>
            <span className="badge badge-success">{price(props)} €</span>
        </div>
    )
}