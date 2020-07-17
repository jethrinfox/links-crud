const express = require('express');
const router = express.Router()
const passport = require('passport')
const { isLoggedIn } = require('../lib/auth')


/*
*   GET ROUTES
*/
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.get('/signin', (req, res) => {
    res.render('auth/signin')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/signin')
})


/*
*   POST ROUTES
*/
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
)

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})


module.exports = router