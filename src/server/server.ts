import * as express from 'express';
import {RideRouter} from './ride.routes';
import * as bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));

app.use('/ride', RideRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
