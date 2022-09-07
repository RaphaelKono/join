let backendTasks;
let serverTasks;
let currentUserId;
let backendUsers;
let localTasks;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

async function init() {
  setURL("https://gruppe-302.developerakademie.net/smallest_backend_ever");
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
  //await backend.setItem("tasks", JSON.stringify(tasks));
  //backendTasks = (await JSON.parse(backend.getItem("tasks")));
  backendTasks = tasks;
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
