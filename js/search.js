function searchDiv(id, text){
    var insideDiv = document.getElementById(id);
    var listItems = document.querySelectorAll("#"+ id + ' > div');
    listItems.forEach(function(listItem){
        console.log(listItem);
        var name = listItem.querySelector('.name').innerText;
        var id = listItem.querySelector('.idNumber').innerText;
        // Check if matches
        if(name.match(text)|| id.match(text)){
            alert(name + ":" + id);
            listItem.style = "display:none";
            return true;
        }
        return false;
    });
}