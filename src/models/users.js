const Database = require('./database')

class User extends Database{
    constructor() {
        console.log('user model...')
        super('users')
    }
}

module.exports = new User()