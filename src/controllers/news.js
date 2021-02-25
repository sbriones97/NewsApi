const fetch = require("node-fetch")
const url = 'https://newsapi.org/v2/'
const apiKey = '04facfddb30e45f58465cda2b63a9820'


module.exports = function (res, search_text) {
    console.log('a buscar ' + search_text)
    let sendParam = 'everything?q=' + search_text + '&apiKey=' + apiKey
    
    fetch(url + sendParam)
        .then(response => {
            if(response.status == 200) {
                return response.text()
            }
        } )
        .then(body => {
            res.status(200).end(body)
        })
        .catch(err => {
            res.status(err.status).end(err.message);
        });

    // let xhttp = new XMLHttpRequest()
    // xhttp.onreadystatechange = function() {
    //      if (this.readyState == 4 && this.status == 200) {
    //          console.log(this.responseText)
    //          var responseArticles = JSON.parse(this.responseText).articles
    //          res.end(responseArticles)
    //      }
    // }
    // console.log(url + sendParam)
    // xhttp.open("GET", url + sendParam, true)
    // xhttp.send()
}
