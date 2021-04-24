const Database = require('./database')

class Token extends Database{
    constructor() {
        console.log('token model...')
        super('user')
    }
}

module.exports = new Token()