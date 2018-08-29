require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios')

const rc = require('./Controllers/register_controller');
const ac = require('./Controllers/auth_controller')
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
// app.post('/api/register/part1', rc.registerPart1);

app.post('/api/register/participant')
app.post('/api/register/guardian')
app.post('/api/register/emergency')
app.post('/api/register/attend')
app.put('/api/register/participants/:g_id/:e_id/:a_id')










// authentication //

app.get('/auth/callback', ac.login);

app.get('/api/user-data', aw.envCheck, ac.userData)

app.get('/auth/logout', ac.logout)










// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, () => {
    console.log(`we are live on ${SERVER_PORT}`);

})