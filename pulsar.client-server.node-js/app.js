const express = require('express');
const bodyParser = require('body-parser');

const authRoues = require('./routes/auth.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(authRoues);

app.listen(8080,() => {
    console.log("Server started");
});

