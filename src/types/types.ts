
// Data contract
export type Ride = {
    id: number
    distance: number
    startTime: string
    duration: number
}


export type TaxiRide = { clicked: boolean } & Ride