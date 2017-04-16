if (localStorage.getItem('user')) {
} else {
    var temp = window.location.toString().split('/');
    // temp[temp.length - 1] = "reports.html";
    temp[temp.length - 1] = 'login.html';
    temp = temp.join('/');
    window.location.replace(temp);
}

document.getElementById('logoutBtn').onclick = function () {
    localStorage.removeItem('user')
    alert('Logging out');
}