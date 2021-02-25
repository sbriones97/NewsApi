const express = require('express')
const newsController = require('../src/controllers/news')

console.log("Si carga routes")

const router = express.Router()

router.get('/:search', (req, res) => {
    var search_text = req.params.search
    console.log("El search es " + search_text)
    newsController(res, search_text)
})

module.exports = router