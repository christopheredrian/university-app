document.getElementById('exportBtn').onclick = function (e) {
    e.preventDefault();
    var MyArray = localStorage.getItem('people');
    var _myArray = JSON.stringify(MyArray, null, 4)
    var vLink = document.createElement('a'),
        vBlob = new Blob([_myArray], {type: "octet/stream"}),
        vName = 'export.json',
        vUrl = window.URL.createObjectURL(vBlob);
    vLink.setAttribute('href', vUrl);
    vLink.setAttribute('download', vName);
    vLink.click();
}