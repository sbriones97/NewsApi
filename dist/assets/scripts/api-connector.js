var url = 'https://newsapi.org/v2/';
var apiKey = '04facfddb30e45f58465cda2b63a9820';
function getNewsEverything(search_text) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var responseArticles = JSON.parse(this.responseText).articles;
            introduceDivNews(responseArticles);
        }
    };
    let sendParam = 'everything?q=' + search_text + '&apiKey=' + apiKey;
    console.log(url + sendParam);
    xhttp.open("GET", url + sendParam, true);
    xhttp.send();
}
