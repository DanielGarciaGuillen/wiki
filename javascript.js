var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=Albert%20Einstein&srlimit=10";

fetchJsonp(url).then(function(response){
    return response.json();
    /* if(response.ok){
        
    } throw new Error("Network response was not ok.");     */
}).then(function(json){
    console.log("parsed json", json)
    /* document.getElementById("list").innerHTML = myjon.query.search[0].title; */
}).catch(function(error){
    console.log("There has been a problem" + error.message)
});