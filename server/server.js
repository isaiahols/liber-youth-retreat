require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios')
const aws = require('aws-sdk');



const rc = require('./Controllers/register_controller');
const ac = require('./Controllers/auth_controller')
const aw = require('./Middleware/auth_middleware')

// // //Declarations// // //
const app = express();
const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
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


// PHOTO UPLOADING //
app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});








// authentication //

app.get('/auth/callback', ac.login);

app.get('/api/user-data', aw.envCheck, ac.userData);

app.get('/auth/logout', ac.logout);










// // // Please Leave Me Alone!!! // // //

app.listen(SERVER_PORT, () => {
    console.log(`we are live on ${SERVER_PORT}`);

})