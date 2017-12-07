
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageterms%7Cpageimages&list=&meta=&generator=search&formatversion=2&exlimit=max&exintro&gsrsearch=";
const urlEnd = "&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet";

var list =[];
var wordToSearch;



function deleteList(){
    list.length = 0;    
}

//Search Word 
function searchWord(event){
    wordToSearch = this.value;
    var keyId = event.keyCode;
    console.log(keyId);
    if(wordToSearch == ""){
            deleteList();
            console.log("List deleted" + list);
            
           suggestions.style.visibility = "hidden";
            
            
            
           
    }else if(event.keyCode == 8) {
        console.log("else if")
        deleteList();
        apiRequest();
        suggestions.style.visibility = "initial";
    }
    
    
    
    
    else {
        suggestions.style.visibility = "initial";
        suggestions.style.display = "flex";
            console.log("searchWord called "+ wordToSearch);
            apiRequest()
    }
}


function apiRequest (){
    fetch(proxyUrl + url+ wordToSearch+ urlEnd)    
    .then(blob=>blob.json())    
    .then(data=> list.push(...data.query.pages))

    //Promise fullfilled, call to displayMatches. 
    .then(displayMatches)
    console.log("display inside apirequest")    
    console.log('fetchApi executed');
    console.log(list);       
}


function displayMatches(){ 
    console.log("display Matches called");    
    const matchArray = findMatches(wordToSearch, list);    
    const html = matchArray.map(pages =>{               
        return`
        <li class="article">
        <a href=${"http://en.wikipedia.org/?curid="+pages.pageid} target="_blank"> 
        <span class="titleH1"><h1>${pages.title}</h1></span>               
       </a>
       ${pages.terms.description}
        </li>
        `;
    }).join("");   
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

const articles = document.querySelector('.article');

searchInput.addEventListener('keyup',searchWord);

