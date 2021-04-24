const express = require('express')
const fs = require('fs')

const { newsRoutes, usersRoutes } = require('./routes') 
const { User } = require('./src/models') 
const authMiddleware = require('./src/middlewares/auth')

const app = express()
const dotenv = require('dotenv')
const { ppid } = require('process')
const cors = require('cors');

const handlebars = require('express-handlebars');

const port = process.env.PORT || 3000
console.log(port)
const { json, urlencoded } = express

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(json())
app.use(cors())

// app.engine('handlebars', handlebars())
// app.set('view engine', )
// app.set()

app.use('/', authMiddleware)
app.use('/assets', express.static('./dist/assets'))

app.use('/news', newsRoutes)
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    let indexFile = fs.readFileSync("./views/index.html")
    res.end(indexFile)
})

app.get('/registry', (req, res) => {
    let registryHtml = fs.readFileSync("./views/registry.html")
    res.end(registryHtml)
})

app.get('/login', (req, res) => {
    let loginHtml = fs.readFileSync("./views/login.html")
    res.end(loginHtml)
})

app.listen(port, () => {
    console.log('app is listening in port ' + port)
})

// const socketIo = require('socket.io')

// const io = socketIo(server, {
//     cors: {
//         origin: 'http://localhost:4200',
//         methods: ['GET', 'POST'],
//         allowHeaders: ['Authorization'],
//         credentials: true
//     }
// })

// io.on('connection', socket => {
//     console.log('Se ha conectado', socket)
// })
