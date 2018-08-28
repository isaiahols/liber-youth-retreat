require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios')

const rc = require('./Controllers/register_controller');
const aw = require('./Middleware/auth_middleware')

// // //Declarations// // //
const app = express();
const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    NODE_ENV
} = process.env;


// Database Connection
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

// // // Middleware // // //
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
}))



// // // Endpoints // // //

app.get('/api/session-info', rc.giveSessionData);


// writing to db while registering
app.post('/api/register/part1', rc.registerPart1);












// auth0 //

app.get('/auth/callback', aw.login);







// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, () => {
    console.log(`we are live on ${SERVER_PORT}`);

})