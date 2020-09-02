const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/diary');

module.exports = function(passport){
    passport.use(new localStrategy((username, password, done) => {
        User.findOne({$or : [{
            username : username
        }, {email : username}]}, (err, user) => {
            if (err) throw err;
            if(!user) return done(null, false, {msg : 'username or email doesn\'t exist'});
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(isMatch) return done(null, user);
                return done(null, false, {msg : 'incorrect password'})
            });
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(null, user);
        })
    })
}