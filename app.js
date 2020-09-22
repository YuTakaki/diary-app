const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');

mongoose.Promise = global.Promise;

const app = express();

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB ,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to database'))
    .catch(error => console.log(error));
require('./setup/passport')(passport);
app.use(session({
    secret : 'cat',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/dashboard', require('./route/dashboard'));
app.use('/user', require('./route/login_signup'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`connected to port ${port}`))