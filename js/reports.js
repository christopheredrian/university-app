/**
 * Created by chris on 4/9/2017.
 */


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/**
 * @param people people object from local storage
 * @param startTime time in milliseconds
 * @param endtime  time in milliseconds
 * @param fileName
 */
function createReport(people, startTime, endtime, fileName) {
    var rows = [];
    console.log(people);
    rows.push(["Name", "Id Number", "Category", "Date", "Start Time", "End Time"]);
    for (var id in people) {
        var currentRow = [];
        if (isInBetween(people[id]['startTime'], startTime, endtime) &&
            isInBetween(people[id]['endTime'], startTime, endtime)) {
            var startObj = new Date(people[id]['startTime']);
            var endObj = new Date(people[id]['endTime']);
            currentRow.push(encloseWithQuotation(people[id]['name']));
            currentRow.push(encloseWithQuotation(people[id]['idNumber']));
            currentRow.push(encloseWithQuotation(people[id]['category']));
            currentRow.push(encloseWithQuotation(endObj.getYear() + "-" + endObj.getMonth() + 1 + "-" + endObj.getDate()));
            currentRow.push(encloseWithQuotation(startObj.getHours() + ":" + startObj.getMinutes() + ":" + startObj.getSeconds()));
            currentRow.push(encloseWithQuotation(endObj.getHours() + ":" + endObj.getMinutes() + ":" + endObj.getSeconds()));
            // rows += "\n";
            rows.push(currentRow);
            alert(true);
        } else {
            console.log('e linub');
        }
        console.log('--------------------');
        // if (currentRow.length > 0) {
        //
        // }
    }
    if (rows.length > 0) {
        var data = rows;
        var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function (infoArray, index) {

            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString + "\n" : dataString;

        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    }
    console.log(rows);

}

function isInBetween(date, start, end) {
    console.log(date + " " + start + " " + end);
    console.log(date >= start && date <= end);
    return (date >= start && date <= end);
}

function encloseWithQuotation(text) {
    return '"' + text + '"';
}

document.getElementById('generateBtn').onclick = function (event) {
    var startDate = new Date(document.getElementById('startDate').value);
    var endDate = new Date(document.getElementById('endDate').value);
    createReport(PersonStorage.people, startDate.getTime(), endDate.getTime(), 'reports.csv');
    // console.log(new Date(startDate.value) + ' ' + );
};



