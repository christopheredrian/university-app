/**
 * Function for creating a person instance
 * @param fullName
 * @param idNumber
 * @param category
 * @param startTime
 * @returns person object {{}}
 */
function createPerson(fullName, idNumber, category, startTime) {
    var person = {};
    person.id = startTime.getTime();
    person.signedIn = true;
    person.idNumber = idNumber;
    person.name = fullName;
    person.category = category;
    person.startTime = startTime.getTime();
    person.endTime = null;
    return person;
}


/**
 * This is used for CRUD (Create, Read, Update and Delete) operations for the local storage
 * @type object
 */
var PersonStorage = {
    // Static variables
    people: {},
    // Create person
    create: function (fullName, idNumber, category, startTime) {
        this.people[startTime.getTime()] = createPerson(fullName, idNumber, category, startTime);
        this.saveToLocalStorage();
    },
    delete: function (id) {
        delete this.people[id];
        this.saveToLocalStorage();
    },
    saveToLocalStorage: function () {
        localStorage.setItem('people', JSON.stringify(this.people));
    },
    getLocalStorage: function () {
        if (localStorage.getItem('people')) {
            this.people = JSON.parse(localStorage.getItem('people'));
        }
    },
    signOut: function (button) {
        var now = new Date();
        PersonStorage.people[button.getAttribute('data-id')].endTime = now.getTime();
        PersonStorage.people[button.getAttribute('data-id')].signedIn = false;
        this.saveToLocalStorage();
    }
};

/**
 * This object is in charge for HTML Behaviors
 * @type {{getInputFormValues: ApplicationView.getInputFormValues, signIn: ApplicationView.signIn, clearInput: ApplicationView.clearInput,
 * removePerson: ApplicationView.removePerson, signOut: ApplicationView.signOut}}
 */
var ApplicationView = {
    getInputFormValues: function () {

    },
    signIn: function (fullName, idNumber, category, startTime) {
        var clone = templateDiv.cloneNode(true);
        removeClass(clone, 'hidden');
        clone.querySelector('#templateDiv span.name').innerText = fullName;
        clone.querySelector('#templateDiv span.idNumber').innerText = idNumber;
        clone.querySelector('#templateDiv span.category').innerText = category;
        clone.querySelector('#templateDiv span.dateStart').innerText = startTime.toLocaleString();
        clone.querySelector('#templateDiv .deleteBtn').setAttribute('data-id', startTime.getTime());
        clone.querySelector('#templateDiv .deleteBtn').onclick = ApplicationController.removePerson;
        clone.querySelector('#templateDiv .signOutBtn').setAttribute('data-id', startTime.getTime());
        clone.querySelector('#templateDiv .signOutBtn').onclick = ApplicationController.signOut;

        var dateStart = document.createElement('input');
        dateStart.type = 'hidden';
        dateStart.value = startTime.getTime();
        clone.id = startTime.getTime();
        clone.appendChild(dateStart);
        insideListDiv.appendChild(clone);
    },
    clearInput: function () {
        idNumberInput.value = "";
        categoryInput.value = "Visitor";
        fullNameInput.value = "";
    },
    removePerson: function (id) {
        document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    },
    signOut: function (currentPerson) {
        // outsideListDiv.appendChild(div);
        // append to sign out
        var startTime = new Date(currentPerson.startTime);
        var endTime;
        if (currentPerson.endTime) {
            endTime = new Date(currentPerson.endTime);
        } else {
            endTime = new Date();
        }
        var clone = templateDivSignOut.cloneNode(true);
        clone.id = startTime.getTime();
        removeClass(clone, 'hidden');
        clone.querySelector('span.name').innerText = currentPerson.name;
        clone.querySelector('span.idNumber').innerText = currentPerson.idNumber;
        clone.querySelector('span.category').innerText = currentPerson.category;
        clone.querySelector('span.dateStart').innerText = startTime.toLocaleString();
        clone.querySelector('span.dateEnd').innerText = endTime.toLocaleString();
        clone.querySelector('.deleteBtn').setAttribute('data-id', startTime.getTime());
        clone.querySelector('.deleteBtn').onclick = ApplicationController.removePerson;
        outsideListDiv.appendChild(clone);

    }
};

/**
 * This object is responsible for controlling the interactions of views and local storage, functions inside this
 * namespace are also used for event handling
 * @type {{init: ApplicationController.init, addPerson: ApplicationController.addPerson,
 * removePerson: ApplicationController.removePerson, signOut: ApplicationController.signOut,
 * generateReport: ApplicationController.generateReport, validateForm: ApplicationController.validateForm}}
 */
var ApplicationController = {
    init: function () {
        // preventDefault on form 
        document.querySelector('.mainForm').onsubmit = function (event) {
            event.preventDefault();
        }

        // Setting of data
        PersonStorage.people = JSON.parse(localStorage.getItem('people')) || {};
        for (var k in PersonStorage.people) {
            if (PersonStorage.people.hasOwnProperty(k)) {
                var currentPerson = PersonStorage.people[k];
                if (currentPerson.endTime === null) {
                    ApplicationView.signIn(currentPerson.name, currentPerson.idNumber,
                        currentPerson.category, new Date(currentPerson.startTime));
                } else {
                    ApplicationView.signOut(currentPerson);
                }
            }
        }

    },
    addPerson: function () {
        if(formValid()){
			var today = new Date();
			var fullNameVal = fullNameInput.value;
			var idNumberVal = idNumberInput.value;
			var categoryVal = categoryInput.value;
			var startTimeVal = today;
			ApplicationView.signIn(fullNameVal, idNumberVal, categoryVal, startTimeVal);
			ApplicationView.clearInput();
			PersonStorage.create(fullNameVal, idNumberVal, categoryVal, startTimeVal);
		} else{
			alert('Invalid Input!');
		}
    },
    removePerson: function () {
        PersonStorage.delete(this.getAttribute('data-id'));
        ApplicationView.removePerson(this.getAttribute('data-id'));
    },
    signOut: function () {
        var id = this.getAttribute('data-id');
        ApplicationView.removePerson(id);
        ApplicationView.signOut(PersonStorage.people[id]);
        PersonStorage.signOut(this);
    },
    generateReport: function () {
    },
    validateForm: function () {
    }
};

// Utility classes
function addClass(el, c) {
    el.className += ' ' + c;
}

function removeClass(el, c) {
    var elClass = ' ' + el.className + ' ';
    while (elClass.indexOf(' ' + c + ' ') != -1)
        elClass = elClass.replace(' ' + c + ' ', '');
    el.className = elClass;
}

// Event and Variable Registration
var fullNameInput = document.getElementById('fullName');
var categoryInput = document.getElementById('category');
var idNumberInput = document.getElementById('idNumber');
var templateDiv = document.getElementById('templateDiv');
var templateDivSignOut = document.getElementById('templateDivSignOut');
var insideListDiv = document.getElementById('insideList');
var outsideListDiv = document.getElementById('outsideList');

var submitBtn = document.getElementById('submitBtn');
submitBtn.onclick = ApplicationController.addPerson;


// Experimental  Drag and Drop
// Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
    var element = document.getElementById(data);
    var signOutBtn = element.querySelector('.signOutBtn');
    signOutBtn.click();
}


// These are executed upon finishing the page contents
PersonStorage.getLocalStorage();
ApplicationController.init();

// initialize timer
function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
    var strcount
    var x = new Date()
    // document.getElementById('currentTime').innerHTML = x;
    document.getElementById('currentTime').innerHTML = x.toDateString() + "<br>" + x.toLocaleTimeString();
    tt = display_c();
}

function formValid(){
	return document.getElementById('fullName').value != "" && document.getElementById('idNumber').value != "";
}
