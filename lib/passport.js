const passport = require('passport');
const LocalStrategy = require('passport-local');
//const mongoose = require('mongoose');
const User = require('../models/User');

const helpers = require('../lib/helpers')


passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const result = await User.findOne({ username: username })

    if (result) {

        const user = result
        console.log(user);

        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {

            done(null, user, req.flash('success', 'Welcome ' + user.username))

        } else {
            done(null, false, req.flash('message', 'Incorrect Password'))
        }
    } else {
        return done(null, false, req.flash('message', 'The username doesn\'t exist'))
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    let newUser = {
        username,
        password,
    }
    newUser.password = await helpers.encryptPassword(password)
    newUser = await User.create(newUser)
    console.log(newUser);
    return done(null, newUser)
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});