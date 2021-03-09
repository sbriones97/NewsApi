const express = require('express')
const UsersController = require('../src/controllers/users')

const router = express.Router()

router.get('/', (req, res) => {
    res.end('news endpoint users')
    User.findOne()
})

router.post('/', (req, res) => {
    console.log('posteando ando')
    console.log(req.body)
    UsersController.insert(res, req)
})

router.get('/:id', (req, res) => {
    res.end('news endpoint users by ID')
})


module.exports = router