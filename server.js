const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./Routes/api/users');
const profile = require('./Routes/api/profile');
const posts = require('./Routes/api/posts');

const app = express();

// Middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to mongoDB

mongoose.connect(db)
        .then(()=>console.log("mongoDb connected"))
        .catch((err)=>console.log(err))
// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);
// Users Routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts)
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log('server is running'))