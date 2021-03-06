import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as authMiddleware from './middleware/authentication.middleware';
import * as secrets from './configs/secrets';
import { ChannelRouter } from './routes/chanal.routes';
import { StreamRouter } from './routes/stream.routes';
import { errorHandling } from './middleware/application-error.middleware';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH'
        );
        return res.status(200).json({});
    }
    return next();
});

//#region Application constants

app.set('port', process.env.PORT || 3000);

//#endregion

//#region Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware.useAuthentication);

//#endregion

//#region Routes

app.use('/channel', ChannelRouter);
app.use('/stream', StreamRouter);
//#endregion

//#region Error Handling

app.use(errorHandling);

//#endregion
console.log(secrets.MONGODB_URI)
mongoose
    .connect(secrets.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Pulsar'
    })
    .then(() => {
        console.log('MongoDb: Connected');
    })
    .catch((err) => {
        console.log('MongoDb: ', err);
    });

export default app;
