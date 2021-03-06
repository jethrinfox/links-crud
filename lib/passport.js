const passport = require('passport');
const LocalStrategy = require('passport-local');
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
    const findUser = await User.findOne({ username: username })
    if (findUser) {
        return done(null, false, req.flash('message', 'Username already in use'))
    } else {
        let newUser = {
            username,
            password,
        }
        newUser.password = await helpers.encryptPassword(password)
        newUser = await User.create(newUser)
        return done(null, newUser)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});