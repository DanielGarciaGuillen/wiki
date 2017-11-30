const proxyurl = "https://cors-anywhere.herokuapp.com/";
var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=Albert%20Einstein&srlimit=10";

var title = document.getElementById('quote');

var arrayList=[];

fetch(proxyurl + url).then(function(response){
    return response.json();
   
}).then(function(json){
    console.log("parsed json", json)
    var list = json.query.search;
    console.log(list);
    list.forEach(function(k){
        console.log( k.title + k.snippet)
       
    });
   
  
    
}).catch(function(error){
    console.log("There has been a problem" + error.message)
});