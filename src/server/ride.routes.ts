import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import { MongoClient } from "mongodb"
import { Ride } from '../types/types';

export const RideRouter = express.Router();

// Get all rides 
RideRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const uri = "mongodb+srv://admin:admin@cluster0-txqls.mongodb.net/taxi?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        client.connect(async err => {
            if(err) console.log(err.message)
            
            const collection = await client.db("taxi").collection("ride").find().toArray()
            res.json(collection)
            client.close();
        });
    })()
});

// Insert a new ride
RideRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let newRide : Ride = {
        id: req.body.id,
        duration: req.body.duration,
        distance: req.body.distance,
        startTime: req.body.startTime 
    }

    const uri = "mongodb+srv://admin:admin@cluster0-txqls.mongodb.net/taxi?retryWrites=true&w=majority";

    (async () => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            if(err) console.log(err.message)
            
            const ride = await client.db("taxi").collection("ride").insertOne(newRide)
            res.json(ride.ops)
            client.close();
        });
    })()

});