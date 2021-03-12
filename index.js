const express = require('express')

const { newsRoutes, usersRoutes } = require('./routes') 
const { User } = require('./src/models') 
const authMiddleware = require('./src/middlewares/auth')

const app = express()
const dotenv = require('dotenv')

const port = process.env.PORT || 3000
console.log(port)
const { json, urlencoded } = express

app.use(json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', authMiddleware)

app.use('/news', newsRoutes)
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    let indexHtml = fs.readFileSync("./views/index.html")
    res.end(indexFile)
})

app.get('/registry', (req, res) => {
    let indexHtml = fs.readFileSync("./views/registry.html")
    res.end(indexFile)
})

app.listen(port, () => {
    console.log('app is listening in port ' + port)
})


