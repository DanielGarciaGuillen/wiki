const proxyurl = "https://cors-anywhere.herokuapp.com/";
var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=Albert%20Einstein&srlimit=10";


var arrayList=[];

fetch(proxyurl + url).then(function(response){
    return response.json();
    /* if(response.ok){
        
    } throw new Error("Network response was not ok.");     */
}).then(function(json){
    console.log("parsed json", json)
    let output = '<h2 List of content</h2>';
     Object.keys(json).forEach(function(query) {        
         arrayList = json[query];
        console.log(arrayList);
    });

    /*
    json.forEach((query)=>{
        result +=
        `<ul>
        <li> ${query.search}</li>
        </ul>
        `;
        document.getElementById("list").innerHTML = result;
    }) */
    
}).catch(function(error){
    console.log("There has been a problem" + error.message)
});