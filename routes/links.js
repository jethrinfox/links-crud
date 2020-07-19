const express = require('express');
const router = express.Router()
const Link = require('../models/Link')


/*
*   GET ROUTES
*/
router.get('/', async (req, res) => {
    const links = await Link.find({ user_id: req.user._id })
        .sort({ createdAt: 'desc' })
        .lean()
    res.render('links/list', { links })
})

router.get('/add', (req, res) => {
    res.render('links/add')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params

    await Link.remove({ _id: id })

    req.flash('success', 'Link removed succesfully')
    res.redirect('/links')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const link = await Link.findById(id)
    res.render('links/edit', { link })
})


/*
*   POST ROUTES
*/
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
        title, url, description, user_id: req.user._id
    }
    await Link.create(newLink)
    req.flash('success', 'Link saved succesfully')
    res.redirect('/links')
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    const { title, url, description } = req.body
    const updateLink = {
        title, url, description
    }

    await Link.updateOne({ _id: id }, updateLink)

    req.flash('success', 'Link edited succesfully')
    res.redirect('/links')
})


module.exports = router