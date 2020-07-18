const express = require('express');
const router = express.Router()
const { isLoggedIn } = require('../lib/auth')


router.get('/', isLoggedIn, (req, res) => {
    res.redirect('links')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
})


module.exports = router