/**
 * A function that searches a div for a name and an id of specified text
 * @param id - id of div to search for insideList or ousideList
 * @param text - text to search for
 */
function searchDiv(id, text) {
    /**
     * Helper function for determining if text is empty
     * @param text - text to test
     */
    function isEmpty(text) {
        return text == '';
    }
    var insideDiv = document.getElementById(id);
    var listItems = document.querySelectorAll("#" + id + ' > div');
    listItems.forEach(function (listItem) {
        var name = listItem.querySelector('.name').innerText;
        var id = listItem.querySelector('.idNumber').innerText;
        // Display if matches
        if ((name.match(text) || id.match(text)) && !isEmpty(text)) {
            listItem.style = "";
            return false;
        } else {
            listItem.style = "display:none";
            return true;
        }
    });
}