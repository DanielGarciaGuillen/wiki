const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch="/* Albert%20Einstein;"  Albert%20Einstein;  */
const urlEnd = "&srlimit=10"
var list =[];


function callApi(){
 fetch(proxyUrl + url+ this.value+ urlEnd)
    .then(blob=>blob.json())    
    .then(data=> list.push(...data.query.search));
        function findMatches(wordToMatch, list){
            console.log(wordToMarch + list)
            return list.filter(search => {      
            const regex = new RegExp(wordToMatch, 'gi');
            return search.title.match(regex)  
                   
    });
    }
}

function displayMatches(){    
    const matchArray = findMatches(wordToMatch, list);   
    const html = matchArray.map(search =>{
        return`
        <li>
        <span class="title">${search.title}, ${search.snippet}</span>
        </li>
        `;
    });
    suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('keyup', callApi);
searchInput.addEventListener('keydown', deleteList);

function deleteList(){
    list.length = 0;
}












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