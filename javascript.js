
const searchInput = document.querySelector('.search');
var searchWord =  document.querySelector('.search').innerHTML;

const suggestions = document.querySelector('.suggestions');
console.log(searchWord);

const proxyurl = "https://cors-anywhere.herokuapp.com/";
var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + searchWord + "&srlimit=10"; /* Albert%20Einstein; */

var titleid = document.getElementById("titleId").innerHtml;
console.log(titleid);



var list =[] ;


function apiSearch(){fetch(proxyurl + url)
    .then(blob=>blob.json())
    .then(data=> list.push(...data.query.search));

    function findMatches(wordToMatch, list){
        return list.filter(search => {      
        const regex = new RegExp(wordToMatch, 'gi');
        return search.title.match(regex)
    });
}
}

function displayMatches(){
    const matchArray = findMatches(this.value, list)
    const html = matchArray.map(search =>{
        return`
        <li>
        <span class="title">${search.title}, ${search.snippet}</span>
        </li>
        `;
    });
    suggestions.innerHTML = html;
}



/* searchInput.addEventListener('change', displayMatches); */
searchInput.addEventListener('keyup', displayMatches);














/* 
fetch(proxyurl + url).then(function(response){
    return response.json();
   
}).then(function(json){
     console.log("parsed json", json) 
    list = json.query.search;
    console.log(list); 
    list.forEach(function(k){
        / console.log( k.title + k.snippet)
       
        console.log( list )
       
    });
   
  
    
}).catch(function(error){
    console.log("There has been a problem" + error.message)
}); */