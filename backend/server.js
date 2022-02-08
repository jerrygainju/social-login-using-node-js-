const express = require ('express');
const app = new express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//adding controllers
const gmailSign = require('./controller/gmailSignin');
const registerPost = require('./controller/register');
const login = require('./controller/login');

// using packages
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//setting up database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to Mongoose")
});

app.get('/', (req,res) =>{
    res.send("hello");
}); 

//setting up route
app.post('/gmaillogin',gmailSign);
app.post('/register',registerPost);
app.post('/login', login);
   

//setting ports
const PORT = process.env.PORT
app.listen(PORT,() => {console.log(`listening on port ${PORT}`)})




