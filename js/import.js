var importOrig = document.getElementById('importOrig');
document.getElementById('importBtn').onclick = function (e) {
    e.preventDefault();
    importOrig.click();
};
importOrig.addEventListener("change", importFun, false);
// fakeImp.onclick = function (e) {
//     e.preventDefault();
//     importOrig.click();
// }
function importFun() {
    var files = e.target.files, reader = new FileReader();
    reader.onload = _imp;
    reader.readAsText(files[0]);
}
function _imp() {
    var _myImportedData = JSON.parse(this.result);
    importOrig.value = '';
}
