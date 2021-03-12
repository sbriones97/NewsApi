const express = require('express')
const multer = require('multer')
const UsersController = require('../src/controllers/users')

const router = express.Router()

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image')
    cb(null, flag)
}
const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilter
})


router.get('/', (req, res) => {
    res.end('news endpoint users')
    User.findOne()
})

router.post('/', uploadFile.single('img'), (req, res) => {
    console.log('posteando ando')
    console.log(req.body)
    UsersController.insert(res, req)
})

router.get('/:id', (req, res) => {
    res.end('news endpoint users by ID')
})


module.exports = router