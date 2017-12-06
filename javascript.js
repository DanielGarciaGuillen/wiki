const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageterms%7Cpageimages&list=&meta=&generator=search&formatversion=2&exlimit=max&exintro&gsrsearch=";

const urlEnd = "&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet";
var list =[];

const urlImage = "https://commons.wikimedia.org/wiki/File:";


var wordToSearch;

function deleteList(){
    list.length = 0;
    console.log("delete list activated");
    console.log(list);
}
//Search Word 
function searchWord(){
    wordToSearch = this.value;
    if(wordToSearch === ""){  

            suggestions.innerHTML= "Filter for a wikipedia article";
            deleteList();
            
           
        
    }else {
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



/*  https://commons.wikimedia.org/wiki/File:  Maybe joint the value with this??? */

{/* <a href=${"http://en.wikipedia.org/?curid="+search.pageid} target="_blank">Link</a>  */}



function displayMatches(){ 
    console.log("display Matches called");       
    
    const matchArray = findMatches(wordToSearch, list);     
    
    const html = matchArray.map(pages =>{
               
        return`
        <li>
        <a href=${"http://en.wikipedia.org/?curid="+pages.pageid} target="_blank"> 
        <span class="title"><h1>${pages.title}</h1></span>               
       </a>
       <span class="description">${pages.terms.description}</span> 
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
