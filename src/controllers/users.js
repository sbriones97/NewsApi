const fetch = require("node-fetch")
const { User } = require('./../models')

const { GoogleAuth, OAuth2Client } = require('google-auth-library')
const { resolveModuleName } = require("typescript")

if(process.env.NODE_ENV=='dev') {
    require('dotenv').config()
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

class UsersController {
    async insert (res, data, file) {
        let json_body = data
        json_body.img = file
    
        User.insertOne(json_body, (err, result) => {
            if (err) {
                res.status(err.status).end(err.message);
                return
            }
            res.status(200).end('Success')
        })
    }
    
    async findOne (data, res) {    
        User.findOne(data, (err, result) => {
            if(err){
                res.status(500).send({ message: `${err}` });
            } else {
                if(result.length == 0){
                    res.status(404).send({ message : 'User not found.' });
                }else{
                    res.status(200).send({ message : 'User obtained', user : result});
                }
                console.log("Result ONE", result)
                res.status(200).send(result)
            }
        })
    }
    
    async findOneAndCreate (filters, data, res) {    
        User.findOne(filters, (err, result) => {
            if(err){
                return null
            } else {
                console.log("Result ONE", result)
                if(!result){
                    //Creo Usuario
                    let data_to_insert = {
                        first_name: data.given_name,
                        last_name: data.family_name,
                        email: data.email,
                        img: data.picture,
                        google_id: data.sub
                    }
                    User.insertOne(data_to_insert, (err, resultInsert) => {
                        if (err) {
                            console.log("Error al insertar")
                        } else {
                            console.log("Se insertó nuevo usuario")
                        }
                    })
                } else {
                    //Checar si tiene googleId
                    if(result.google_id === ''){
                        //update google ID
                        User.updateOne(filters, {$set: {google_id: data.sub}}, (err, result_update)=> {
                            if (err) {
                                console.log("Error al updateOne")
                            } else {
                                console.log("Se actualizo google Id")
                            }
                        })
                    } else {
                        console.log("El usuario está bien")
                    }
                }
            }
        })
    }

    async googleLogin(req, res) {
        console.log('Datos de google: ', req.body.idToken)
        googleClient.verifyIdToken({
            idToken: req.body.idToken
        }).then(response => {
            const data = response.getPayload()
            console.log('Google Response Payload', data)
            // 1.- buscar usuario con email del payload
            this.findOneAndCreate({email: data.email}, data, res)
            // 4.- generar token de sesion con este userID 

            // 401 - unauthenticated
            // 403 - unauthorized
            // 404 - not found
            // 400 - user-based error
            // 200 ok

            res.send('ok')
        })
        .catch( e => {
            console.log('Failed to verify token', e)
            res.status(400).send('Bad credentials')
        })
    }

} 

module.exports = new UsersController()