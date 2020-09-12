const express = require('express');
const Diary = require('../model/diary');
const bcrypt = require('bcrypt');
const passport = require('passport');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended : false}));

route.post('/sign-up', (req, res)=> {
    const {username, email, password, retry_password} = req.body;
    let err = {
        msg_username : '',
        msg_email : '',
        msg_password : '',
        msg_retry : ''
    };
    Diary.findOne({username : username})
        .then((user) => {
            const checkUsername = /^[^\d][\w]{6,}/;
            if(!checkUsername.test(username)) err.msg_username = "not a valid username (should have atleast 6 characters and doesn't starts in number)";
            if(user) err.msg_username = 'Username already exist';
            Diary.findOne({email : email})
                .then((user) => {
                    const check = /([\w.-\_]+)[@][\w]{2,}([.]?[\w]{2,})?([.][\w]{2,})?/;
                    if(!check.test(email)) err.msg_email = "not a valid email";
                    if(user) err.msg_email = 'Email already exist';
                    if(password.length < 8) err.msg_password = 'password should have atleast 8 characters or more';
                    if(password !== retry_password) err.msg_retry = 'password is wrong';
                    if(Object.values(err).every(err => err === '') === false){
                        res.send(err);
                    }else{
                        bcrypt.genSalt(10, (err, salt)=>{
                            if (err) throw err;
                            bcrypt.hash(password, salt, (err, hash) => {
                                if(err) throw err;
                                Diary.create({username, email, password : hash})
                                    .then(() => res.send(true));
                            });
                        });
                    };
                });
        });
});

route.post('/log-in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.send(info);
        req.logIn(user, (err) => {
            if(err) return next(err);
            return res.redirect('/dashboard/' + user._id);
        });
    })(req, res, next)
});

route.get('/log-out', (req, res)=>{
    req.logout();
    res.send('logout');
})


module.exports = route;