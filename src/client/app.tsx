import * as React from 'react';
import { TopSection } from './components/top';
import { Ride, TaxiRide } from '../types/types';
import { useState, useEffect } from 'react';
import { RideComponent } from './components/display.ride';
import { NewRide } from './components/add.ride';

const url = "http://localhost:3000/ride"

export const App = () => {

	const [rideList, setRideList] = useState<TaxiRide[]>([])
	const [error, setError] = useState("")

	// Fetch all rides once the component is mounted
	useEffect(() => {
		fetch(url)
		.then<Ride[]>(response => response.json())
		.then(data => setRideList(data.map(d => {return {...d, clicked: false}})))
		.catch(err => setError(err));
	},[])

	const submit = (newRide: NewRide, close:() => void) => {

		const ride : Ride = {
			id: rideList.length,
			distance: newRide.distance,
			duration: newRide.duration,
			startTime: newRide.startTime
		}

		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ride)
		})
		.then(response => response.json())
		.then(data => {
			setRideList([...rideList, ...data])
			close() // callback to close modal
		})
		.catch(err => setError(err));
	}

	const showAlert = (id: number, msg: string) => {
		alert(msg)
		// Mark ride as clicked
		const r = rideList.map(ride => {
			if(ride.id == id) ride.clicked = true
			return ride
		}) 

		setRideList(r)
	}

	const SowError = (error: string) => {
		return <div className="alert alert-danger" role="alert">{error}</div>
	}

	return (
		<div className="container">
			<TopSection submit={submit}/>
			{error && SowError(error)}
			<div className="ride-list">
				{rideList.map(ride => <RideComponent {...ride} onClick={(id, msg) => showAlert(id, msg) } key={ride.id} />)}
			</div>
		</div>
	)
}