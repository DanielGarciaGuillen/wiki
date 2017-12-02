const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=";
const urlEnd = "&srlimit=10";
var list =[];

var wordToSearch;

function callApi(){
 fetch(proxyUrl + url+ wordToSearch+ urlEnd)
    .then(blob=>blob.json())    
    .then(data=> list.push(...data.query.search))
    console.log('callApi executed')
}

function findMatches(wordToMatch, list){
    console.log('findmatches executed');
    return list.filter(search => {      
    var regex = new RegExp(wordToSearch, 'gi');
    return search.title.match(regex)  
           
});
}

function displayMatches(){  
    
     console.log(wordToSearch)
     console.log(list)
    const matchArray = findMatches(wordToSearch, list);   
    const html = matchArray.map(search =>{
        return`
        <li>
        <span class="title">${search.title}, ${search.snippet}</span>
        </li>
        `;
    });
    suggestions.innerHTML = html;
}


function searchWord(){
    wordToSearch = this.value;
    console.log("searchWord called")
  /*   console.log(wordToSearch); */
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');



searchInput.addEventListener('keyup', callApi);

searchInput.addEventListener('keyup',searchWord);
searchInput.addEventListener('keyup', displayMatches);


 searchInput.addEventListener('keydown', deleteList); 

/*  function deleteList(){
     /* if( wordToSearch !== wordToSearch){
        list = [];
        console.log('list cleaned');  
    list.length = 0;
    
}
    */