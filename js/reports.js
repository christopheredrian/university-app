/**
 * Created by chris on 4/9/2017.
 */

/**
 * Utility for adding days to a specific date
 * @param days
 * @returns {Date}
 */
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

// We are on reports.html
if (document.getElementById('downloadBtn')) {
    var downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = function (e) {
        alert('not yet implemented');
        var startDate = new Date(localStorage.getItem('startDate'));
        var endDate = new Date(localStorage.getItem('endDate'));
        createReport(JSON.parse(localStorage.getItem('people')), startDate.getTime(), endDate.getTime(), 'reports.csv');
    }

    document.getElementById('printBtn').onclick = function () {
        print();
    }

    document.getElementById('generateBtn').onclick = function () {
        document.getElementById('reportsBtn').click();
    }
    viewReport(localStorage.getItem('people'), document.getElementById('reportsTable'));
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("reportsBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function (e) {
    e.preventDefault();
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
 * This creates the CSV report
 * @param people people object from local storage
 * @param startTime time in milliseconds
 * @param endtime  time in milliseconds
 * @param fileName
 */
function createReport(people, startTime, endtime, fileName) {
    var rows = [];
    console.log(endtime);
    rows.push(["Name", "Id Number", "Category", "Date", "Start Time", "End Time"]);
    endtime = new Date(endtime);
    endtime = endtime.addDays(1);
    endtime = endtime.getTime();
    console.log(endtime);
    for (var id in people) {
        var currentRow = [];
        if (isInBetween(people[id]['startTime'], startTime, endtime) &&
            isInBetween(people[id]['endTime'], startTime, endtime)) {
            var startObj = new Date(people[id]['startTime']);
            var endObj = new Date(people[id]['endTime']);
            currentRow.push(encloseWithQuotation(people[id]['name']));
            currentRow.push(encloseWithQuotation(people[id]['idNumber']));
            currentRow.push(encloseWithQuotation(people[id]['category']));
            currentRow.push(encloseWithQuotation(endObj.toLocaleDateString()));
            currentRow.push(encloseWithQuotation(startObj.toLocaleTimeString()));
            currentRow.push(encloseWithQuotation(endObj.toLocaleTimeString()));
            // rows += "\n";
            rows.push(currentRow);
            alert(true);
        } else {
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

        link.click();
    }
    console.log(rows);

}

function isInBetween(date, start, end) {
    // console.log(date + " " + start + " " + end);
    // console.log(date >= start && date <= end);
    return (date >= start && date <= end);
}

function encloseWithQuotation(text) {
    return '"' + text + '"';
}

document.getElementById('viewBtn').onclick = function (event) {
    var startDate = new Date(document.getElementById('startDate').value);
    var endDate = new Date(document.getElementById('endDate').value);
    // createReport(PersonStorage.people, startDate.getTime(), endDate.getTime(), 'reports.csv');
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    window.location.hostname = "reports.html";
    var temp = window.location.toString().split('/');
    // temp[temp.length - 1] = "reports.html";
    temp[temp.length - 1] = 'reports.html';
    temp = temp.join('/');
    window.location.replace(temp);
};


function viewReport(people, tableElement) {
    var peopleCounter = 0,
        visitorCounter = 0,
        studentCounter = 0,
        facultyCounter = 0;
    var startTime = new Date(localStorage.getItem('startDate'));
    var endtime = new Date(localStorage.getItem('endDate'));
    endtime = endtime.addDays(1);
    people = JSON.parse(people);
    for (var id in people) {
        var current = people[id];
        if (isInBetween(current.startTime, startTime, endtime) &&
            isInBetween(current.endTime, startTime, endtime)) {
            peopleCounter++;
            switch (current.category) {
                case 'Visitor':
                    visitorCounter++;
                    break;
                case 'Student':
                    studentCounter++;
                    break;
                case 'Faculty':
                    facultyCounter++;
                    break;
            }
            var startObj = new Date(current.startTime);
            var endObj = new Date(current.endTime);
            var row = document.createElement('tr');

            temp = document.createElement('td');
            temp.innerHTML = peopleCounter;
            row.appendChild(temp);

            var temp = document.createElement('td');
            temp.innerHTML = current['name'];
            row.appendChild(temp);

            temp = document.createElement('td');
            temp.innerHTML = current['idNumber'];
            row.appendChild(temp);
            temp = document.createElement('td');
            temp.innerHTML = current['category'];
            row.appendChild(temp);
            temp = document.createElement('td');
            temp.innerHTML = startObj.toDateString();
            row.appendChild(temp);
            temp = document.createElement('td');
            temp.innerHTML = startObj.toLocaleTimeString();
            row.appendChild(temp);
            temp = document.createElement('td');
            temp.innerHTML = endObj.toLocaleTimeString();
            row.appendChild(temp);
            tableElement.appendChild(row);
        } else {
        }
    }
    document.querySelector('#statistics td#facultyCounter').innerText = facultyCounter;
    document.querySelector('#statistics td#studentsCounter').innerText = studentCounter;
    document.querySelector('#statistics td#visitorsCounter').innerText = visitorCounter;
    document.querySelector('#statistics td#peopleCounter').innerText = peopleCounter;

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var lastend = 0;
    var data = [visitorCounter, facultyCounter, studentCounter]; // data counters here
    var myTotal = 0;
    var myColor = ['#e3f2fd', '#ff5252', '#00e676']; // Colors of each slice

    for (var e = 0; e < data.length; e++) {
        myTotal += data[e];
    }
    for (var i = 0; i < data.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        lastend += Math.PI * 2 * (data[i] / myTotal);
    }


}

/**
 * This is for sorting tables
 * @param n column index to sort
 */
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("reportsTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // it is not a number

            if (isNaN(x.innerHTML) || isNaN(y.innerHTML)) {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

