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
  document.getElementById("profil-logo").src = backendUsers[currentUserId - 1].src;
  document.getElementById("profil-name").innerHTML = backendUsers[currentUserId - 1].firstName;
}
async function getUsersFromServer() {
  backendUsers = (await JSON.parse(backend.getItem("users"))) || [];
  currentUserId = (await JSON.parse(backend.getItem("currentUser"))) || 5;
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

/*
let staff = [
  {
    id: 1,
    userName: "user1",
    password: "short",
    firstName: "Bruce",
    lastName: "Humphrey",
    email: "Bruce.Humphrey@join.de",
    src: "../img/user1.jpg",
  },
  {
    id: 2,
    userName: "user2",
    password: "short",
    firstName: "Hamza",
    lastName: "Paul",
    email: "Hamza.Paul@join.de",
    src: "../img/user2.jpg",
  },
  {
    id: 3,
    userName: "user3",
    password: "short",
    firstName: "Stella",
    lastName: "Hayes",
    email: "Stella.Hayes@join.de",
    src: "../img/user3.jpg",
  },
  {
    id: 4,
    userName: "user4",
    password: "short",
    firstName: "Brian",
    lastName: "McBride",
    email: "Brian.McBride@join.de",
    src: "../img/user4.jpg",
  },
  {
    id: 5,
    userName: "guest",
    password: "short",
    firstName: "Guest",
    lastName: "Anonymus",
    email: "guest@join.de",
    src: "../img/guest-user.jpg",
  },
];*/