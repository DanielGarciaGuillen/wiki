const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=";

const urlEnd = "&srlimit=10";
var list =[];


var wordToSearch;


//Search Word 
function searchWord(){
    wordToSearch = this.value;
    console.log("searchWord called "+ wordToSearch);
}


function apiRequest (){
    fetch(proxyUrl + url+ wordToSearch+ urlEnd)
    .then(blob=>blob.json())    
    .then(data=> list.push(...data.query.search))    
    .then(displayMatches)
    console.log("display inside apirequest")    
    console.log('fetchApi executed');
    console.log(list);   
    
}





function displayMatches(){ 
    console.log("display Matches called");       
    
    const matchArray = findMatches(wordToSearch, list);   
    const html = matchArray.map(search =>{
        console.log(search.pageid);
        return`
        <li>
        
        <span class="snippet">${search.snippet}</span>
        <a href=${"http://en.wikipedia.org/?curid="+search.pageid} target="_blank">Link</a> 
        
        
        </li>
        `;
    });
    suggestions.innerHTML = html;
}




 function findMatches(wordToMatch, list,callback){
    console.log('findmatches executed');
    return list.filter(search => {      
    var regex = new RegExp(wordToSearch, 'gi');
    return search.title.match(regex)           
});
} 




const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');


searchInput.addEventListener('keyup',searchWord);
searchInput.addEventListener('keyup', apiRequest);

/* searchInput.addEventListener('keyup', displayMatches); */

searchInput.addEventListener('keydown', deleteList); 

 function deleteList(){    
        
        console.log('list cleaned');  
    list.length = 0;
    
}
