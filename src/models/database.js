const MongoClient = require('mongodb').MongoClient

const dotenv = require('dotenv')
dotenv.config()
const mongo_url = process.env.MONGO_URL
console.log(mongo_url)

let db
let isConnecting

class Database {

    collectionName

    constructor (collection) {
        if (isConnecting) return
        isConnecting = true
        MongoClient.connect(mongo_url, {useUnifiedTopology: true}, (err, client) => {
            console.log(err)
            if(err) {
                console.log('Failed to connect to MongoDB')
                return
            }
        
            db = client.db()
            this.collectionName = collection
            console.log('Successfully connected to MongoDB')
        })  
    }

    findOne (filters) {
        const collection = db.collection(this.collectionName)
    }

    insertOne (obj, cb) {
        return db.collection(this.collectionName).insertOne(obj, cb)
    }
}

module.exports = Database