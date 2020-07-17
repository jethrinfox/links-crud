const express = require('express');
const router = express.Router()
const { db } = require('../lib/db');


/*
*   GET ROUTES
*/
router.get('/', async (req, res) => {
    //const links = await pool.query('SELECT * FROM links')
    res.render('links/list')
})

router.get('/add', (req, res) => {
    res.render('links/add')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params

    //await pool.query('DELETE FROM links WHERE id = ?', [id])

    req.flash('success', 'Link removed succesfully')
    res.redirect('/links')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    //const link = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render('links/edit')
})


/*
*   POST ROUTES
*/
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
        title, url, description
    }

    //await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link saved succesfully')
    res.redirect('/links')
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    const { title, url, description } = req.body
    const updateLink = {
        title, url, description
    }

    //await pool.query('UPDATE links SET ? WHERE id = ?', [updateLink, id])

    req.flash('success', 'Link edited succesfully')
    res.redirect('/links')
})


module.exports = router