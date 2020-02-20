const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const { errorHandling } = require('./middleware/application-error.middleware');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(errorHandling);


mongoose.connect('mongodb://127.0.0.1:27017/Pulsar',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log('Db Connection: Succes');
    })
    .catch(err => {
        console.error(err);
    });

app.listen('8081', () => {
    console.log("Identity Server started");
});