// API KEY: 04facfddb30e45f58465cda2b63a9820
var boton = document.getElementById('login_google').addEventListener('click', googleLoginMethod);
// var url = 'https://newsapi.org/v2/'
// var apiKey = '04facfddb30e45f58465cda2b63a9820'
const url_getLoginGooglesApi = "http://localhost:3000/users/google/";
function googleLoginMethod() {
    console.log('google Login');
    return fetch(url_getLoginGooglesApi)
        .then(response => {
        if (response.status == 200) {
            console.log(response);
            return response.json();
        }
    })
        .catch(err => {
        console.log("ERROR");
    });
}
