// API KEY: 04facfddb30e45f58465cda2b63a9820
var boton = document.getElementById('search_news').addEventListener('click', searchNews);
// var url = 'https://newsapi.org/v2/'
// var apiKey = '04facfddb30e45f58465cda2b63a9820'
const url_getNewsApi = "http://localhost:3000/news/"


function getNewsEverything(search_text) {
    return fetch(url_getNewsApi + search_text)
        .then(response => {
            if(response.status == 200) {
                console.log(response)
                return response.json()
            }
        })
        .catch(err => {
            console.log("ERROR")
        })
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this)
    //         var responseArticles = JSON.parse(this.responseText).articles
    //         introduceDivNews(responseArticles)
    //     }
    // };
    // console.log(url_getNewsApi + search_text)
    // xhttp.open("GET", url_getNewsApi + search_text, true)
    // xhttp.send()
    // console.log('despues')
}

function searchNews() {
    let searchtext = (<HTMLInputElement>document.getElementById('search_text')).value
    console.log('que pe2')
    console.log(searchtext)
    getNewsEverything(searchtext)
        .then(resultado => {
            console.log("A imprimir resultado")
            console.log(resultado.articles)
            let articulos = resultado.articles
            introduceDivNews(articulos)
        })
        .catch(err => {
            console.log("ERROR")
        })
}

function introduceDivNews(responseJson) {
    let contenido = document.getElementById('content')
    let divsAInsertar = '<div class="grid">'
    for (var i = 0; i < responseJson.length; ++i){
        let title = responseJson[i].title
        let url_img = responseJson[i].urlToImage
        let article_url = responseJson[i].url
        let description = responseJson[i].description
        
        
        divsAInsertar = divsAInsertar + `
                    <div class="grid3">
                        <img src="${url_img}" width="100%">
                        <b>${title}</b>
                        <p>${description}</p>
                        <a href="${article_url}" class="button">ver mas...</a>
                    </div>
                    `
    }
    contenido.innerHTML = divsAInsertar + '</div>'
}
