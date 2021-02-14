var boton = document.getElementById('search_news').addEventListener('click', searchNews);
function searchNews() {
    let searchtext = document.getElementById('search_text').value;
    console.log('que pe2');
    console.log(searchtext);
    getNewsEverything(searchtext);
}
