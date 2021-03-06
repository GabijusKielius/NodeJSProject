const express = require('express')
const router = express.Router()
const Item = require('../models/item')

// All Items Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const items = await Item.find(searchOptions)
        res.render('items/index', { 
            items: items, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/')
    }
})

// New Item Route
router.get('/new', (req, res) => {
    res.render('items/new', { item: new Item() })
})

// Create Item Route
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name
    })
    try {
        const newItem = await item.save()
        // res.redirect(`items/${newItem.id}`)
        res.redirect(`items`)
    } catch {
        res.render('items/new', {
            item: item,
            errorMessage: 'Error creating Item'
        })
    }
})

module.exports = router