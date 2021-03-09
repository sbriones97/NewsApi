const fetch = require("node-fetch")
const { User } = require('./../models')

class UsersController{
    async insert (res, req) {
        console.log('A Insertar')
        console.log(req.body)
        let json_body = req.body
    
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