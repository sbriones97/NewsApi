const express = require('express')
const { newsRoutes } = require('./routes') 

const app = express()
const dotenv = require('dotenv')

const port = process.env.PORT || 3000
console.log(port)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/news', newsRoutes)

app.get('/', (req, res) => {
    let indexHtml = fs.readFileSync("./views/index.html");
    res.end(indexFile);
})

app.listen(port, () => {
    console.log('app is listening in port ' + port)
})


