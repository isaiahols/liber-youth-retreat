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

// GETTING INFO //
app.get('/api/user/participant', rc.getParticipant);
app.get('/api/user/guardian', rc.getGuardian);
app.get('/api/user/emergency', rc.getEmergency);
app.get('/api/camps', rc.getCamps);

// REGISTERING // 
app.post('/api/register', rc.registerParticipant);











// authentication //

app.get('/auth/callback', ac.login);

app.get('/api/user-data', aw.envCheck, ac.userData);

app.get('/auth/logout', ac.logout);










// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, () => {
    console.log(`we are live on ${SERVER_PORT}`);

})