let backendTasks;
let currentUserId;
let backendUsers;

//Urgencies are: Low, Medium, Hight
//Categories are: Managment, Sales, Product, Marketing
//Status are: ToDo, InProgress, Testing, Done

async function init() {
    await includeHTML();
    await downloadFromServer();
    backendUsers = JSON.parse(backend.getItem('users')) || [];
    backendTasks = JSON.parse(backend.getItem('tasks')) || [];
    currentUserId = backendUsers[4]['id'];
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// setURL('https://gruppe-302.developerakademie.net/smallest_backend_ever');


//https://github.com/JunusErgin/smallest_backend_ever
/*Examples
If you want to see a full working example, open the file example.html. Imagine we're having an array of users:

let users = [];
Save
Add a user with this function:

function addUser() {
    users.push('John);
    backend.setItem('users', JSON.stringify(users));
}
If you want to wait for the request you can add the await keyword as well:

Add a user with this function:

async function addUser() {
    users.push('John);
    await backend.setItem('users', JSON.stringify(users));
}
Load
Fill your empty array with users from the Server

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}
Delete
Delete all users from your array:

function deleteUser(name) {
  await backend.deleteItem('users');
}*/