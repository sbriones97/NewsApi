// API KEY: 04facfddb30e45f58465cda2b63a9820
var boton = document.getElementById('registrar').addEventListener('click', registerUser);
// var url = 'https://newsapi.org/v2/'
// var apiKey = '04facfddb30e45f58465cda2b63a9820'
const url_getUsersApi = "http://localhost:3000/users/"


function postUser(email, password, img) {
    let data = {'email': email, 'password': password, 'img': 'imagen'}
    let post_config = { method: 'post', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }

    return fetch(url_getUsersApi, post_config)
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

function registerUser() {
    let email_input = (<HTMLInputElement>document.getElementById('email')).value
    let password_input = (<HTMLInputElement>document.getElementById('password')).value
    let img_input = (<HTMLInputElement>document.getElementById('img')).value
    console.log(email_input)
    console.log(password_input)
    console.log(img_input)
    postUser(email_input, password_input, img_input)
        .then(resultado => {
            console.log("A imprimir resultado")
            console.log(resultado.status)
            // introduceDivNews(articulos)
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
