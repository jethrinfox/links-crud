const express = require('express');
const router = express.Router()
const passport = require('passport')


/*
*   GET ROUTES
*/
router.get('/signup', (req, res) => {
    res.render('auth/signup', { layout: 'auth.hbs' })
})

router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'auth.hbs' })
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
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

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})


module.exports = router