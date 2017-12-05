const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageterms%7Cpageimages&list=&meta=&generator=search&formatversion=2&exlimit=max&exintro&gsrsearch=";

const urlEnd = "&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet";
var list =[];

/* https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageterms%7Cpageimages&list=&meta=&generator=search&formatversion=2&exlimit=max&exintro&gsrsearch=Daniel&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet
 */

var wordToSearch;


//Search Word 
function searchWord(){
    wordToSearch = this.value;
    if(wordToSearch === ""){                   
            suggestions.style.display = "none";
        
    }else {
        suggestions.style.display = "block";
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


{/* <a href=${"http://en.wikipedia.org/?curid="+search.pageid} target="_blank">Link</a>  */}
{/* <span class="snippet">${pages.extract}</span> */}
{/* <img src=${pages.thumbnail.source} alt="Mountain View"> */}

function displayMatches(){ 
    console.log("display Matches called");       
    
    const matchArray = findMatches(wordToSearch, list);   
    const html = matchArray.map(pages =>{        
        return`
        <li>
        
        <span class="snippet"><h1>${pages.title}</h1></span>
        <span class="snippet">${pages.terms.description}</span>        
       
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

searchInput.addEventListener('keyup',searchWord);
