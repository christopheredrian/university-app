/**
 * A function that searches a div for a name and an id of specified text
 * @param id - id of div to search for insideList or ousideList
 * @param text - text to search for
 */
function searchDiv(id, text) {
    text = text.toLowerCase();
    var insideDiv = document.getElementById(id);
    var listItems = document.querySelectorAll("#" + id + ' > div');
    listItems.forEach(function (listItem) {
        if (text == "" || text == null) {
            listItem.style = "display: block";
            return false;

        }

        var name = listItem.querySelector('.name').innerText.toLowerCase();
        var id = listItem.querySelector('.idNumber').innerText.toLowerCase();
        // Display if matches
        if ((name.match(text) || id.match(text)) && !isEmpty(text)) {
            listItem.style = "display: block";
            return false;
        } else {
            listItem.style = "display:none";
            return true;
        }
    });
}

/**
 * Helper function for determining if text is empty
 * @param text - text to test
 */
function isEmpty(text) {
    return text == '';
}

/**
 * Searches the table for specified query
 * @param id table id
 * @param text query
 */
function searchTable(id, text) {
    text = text.toLowerCase();
    // #reportsTable
    var listItems = document.querySelectorAll("#" + id + ' tr:not(:first-child)');
    listItems.forEach(function (listItem) {
        if (text == "" || text == null) {
            listItem.style = "display: in-line";
            return false;
        }
        console.log(listItem)
        // Display if matches
        if ((listItem.innerText.toLowerCase().match(text) && !isEmpty(text))) {
            console.log(listItem.innerText)
            listItem.style = "display: in-line";
            return false;
        } else {
            listItem.style = "display: none";
            return true;
        }
    });

}