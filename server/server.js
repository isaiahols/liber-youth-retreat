require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
// const axios = require('axios')
const stripe = require("stripe");



const rc = require('./Controllers/register_controller');
const ac = require('./Controllers/auth_controller');
const amazon = require('./Controllers/amazon_controller');
const aw = require('./Middleware/auth_middleware');
const pc = require('./Controllers/payment_controller');


// // // Declarations // // //
const app = express();
const {
  SERVER_PORT,
  SECRET,
  CONNECTION_STRING,
  STRIPE_SECRET,
} = process.env;
stripe(STRIPE_SECRET);


// Database Connection
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Connected to Database');

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
app.get('/api/user/attendees', rc.getUsersAttendees);

// REGISTERING // 
app.post('/api/register', rc.registerParticipant);


// PHOTO UPLOADING //
app.get('/sign-s3', amazon.awsS3);


// STRIPE //
app.post('/api/payment', pc.handlePayment);

// UPDATE USER //
app.put('/api/user/:name', rc.updateUsersName);
// build delete for user




// authentication //

app.get('/auth/callback', ac.login);

app.get('/api/user-data', aw.envCheck, ac.userData);

app.get('/auth/logout', ac.logout);










// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, () => {
  console.log(`we are live on ${SERVER_PORT}`);

})