const express = require('express');
const Diary = require('../model/diary');
const bcrypt = require('bcrypt');
const passport = require('passport');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended : false}));

route.post('/sign-up', (req, res)=> {
    const {username, email, password, retry_password} = req.body;
    let err = [];
    Diary.findOne({username : username})
        .then((user) => {
            const checkUsername = /^[^\d][\w]{6,}/;
            if(!checkUsername.test(username)) err.push({msg : "not a valid username"});
            if(user) err.push({msg : 'Username already exist'});
            Diary.findOne({email : email})
                .then((user) => {
                    const check = /([\w.]+)[@][\w]{2,}[.][\w]{2,}([.][\w]{2,})?/;
                    if(!check.test(email)) err.push({msg : "not a valid email"});
                    if(user) err.push({msg : 'Email already exist'});
                    if(password !== retry_password) err.push({msg : 'password is wrong'});
                    if(err.length > 0){
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


module.exports = route;