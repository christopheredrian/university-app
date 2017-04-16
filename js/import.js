var importOrig = document.getElementById('importOrig');
document.getElementById('importBtn').onclick = function (event) {
    event.preventDefault();
    document.getElementById('fileChooser').click();
};

function openFile(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        //   console.log(reader.result.substring(0, 200));
        // document.getElementById("output").innerText = text;
        console.log(text);
        localStorage.setItem('people', text);

    };
    reader.readAsText(input.files[0]);
    alert('Import Successful!');
    window.location.reload();
};
// importOrig.addEventListener("change", importFun, false);
// // fakeImp.onclick = function (e) {
// //     e.preventDefault();
// //     importOrig.click();
// // }
// function importFun() {
//     var files = e.target.files, reader = new FileReader();
//     reader.onload = _imp;
//     reader.readAsText(files[0]);
// }
// function _imp() {
//     var _myImportedData = JSON.parse(this.result);
//     importOrig.value = '';
// }
