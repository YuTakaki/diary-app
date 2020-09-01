const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const app = express();

mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to database'))
    .catch(error => console.log(err));

app.use('/dashboard', require('./route/dashboard'));
app.use('/user', require('./route/login_signup'))

const port = process.env.port || 4000;
app.listen(port, () => console.log(`connected to port ${port}`))