import { Ride } from "../types/types"

// Exported for testing purpose  
export const price = (ride: Ride) => {
    // Initial charge 1 EUR (as soon as the taxi starts moving)
    let fee = 1
    // .50 EUR per 1/5 th of a mile
    let distance = (ride.distance/(0.2)) * 0.5
    // .50 additional EUR between 8PM and 6AM
    let startTime =  new Date(ride.startTime)
    let additional = startTime.getHours() >= 20 && startTime.getHours() <= 6 ? 0.5 : 0
    // 1 EUR additional for busy periods between 4PM and 7PM
    let busy = startTime.getHours() >= 16 && startTime.getHours() <= 19 ? 1 : 0

    return (fee + distance + additional + busy )

}
