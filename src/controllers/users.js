const fetch = require("node-fetch")
const { User } = require('./../models')

class UsersController{
    async insert (res, data, file) {
        console.log('A Insertar')
        console.log(file)
        console.log(data)
        let json_body = data
        json_body.img = file
    
        User.insertOne(json_body, (err, result) => {
            if (err) {
                res.status(err.status).end(err.message);
                return
            }
            res.end('Success')
        })
    }
} 

module.exports = new UsersController()