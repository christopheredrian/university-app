<script>
importOrig.addEventListener("change", importFun, false);
fakeImp.onclick = function () {importOrig.click()}
function importFun() {
  var files = e.target.files, reader = new FileReader();
  reader.onload = _imp;
  reader.readAsText(files[0]);
}

function _imp() {
  var _myImportedData = JSON.parse(this.result);
  importOrig.value = '';
}
</script>