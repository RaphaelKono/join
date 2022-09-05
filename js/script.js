let backendTasks;
let serverTasks;
let currentUserId;
let backendUsers;
let localTasks;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//Urgencies are: Low, Medium, Hight
//Categories are: Managment, Sales, Product, Marketing
//Status are: ToDo, InProgress, Testing, Done

async function init() {
  await includeHTML();
  await downloadFromServer();
  await getUsersFromServer();
  await getTasksFromServer();
}
async function getUsersFromServer() {
  backendUsers = (await JSON.parse(backend.getItem("users"))) || [];
  let zahl = Math.floor(Math.random() * 5);
  currentUserId = backendUsers[zahl]["id"];
}

async function getTasksFromServer() {
  serverTasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  if (tasks.length === 0) {
    localStorage.setItem("tasks", JSON.stringify(serverTasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  await backend.setItem("tasks", JSON.stringify(tasks));
  backendTasks = (await JSON.parse(backend.getItem("tasks")));
  //backendTasks = serverTasks;
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

setURL("https://gruppe-302.developerakademie.net/smallest_backend_ever");

// setURL('https://gruppe-302.developerakademie.net/smallest_backend_ever');
//https://github.com/JunusErgin/smallest_backend_ever
/*Examples
If you want to see a full working example, open the file example.html. Imagine we're having an array of users:

let users = [];
Save
Add a user with this function:

function addUser() {
    users.push('John');
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
