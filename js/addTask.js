let form = document.getElementById("form");
let task = {};
let users = ["user1", "user2", "user3", "user4"];
let selectedUsers = [];

async function init() {
  await includeHTML();
  renderUser();
  form.elements["curDate"].value = new Date().toJSON().split("T")[0];
}

form.addEventListener(
  "submit",
  function (event) {
    if (form.checkValidity()) addTask();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } 
    form.classList.add("was-validated");
  },
  false
);

function addTask() {
    setTask();
    saveTask();
}

function setTask() {
  task = {
    title: form.elements["tasktitle"].value,
    urgency: getUrgency(),
    category: form.elements["category"].value,
    duedate: form.elements["dueDate"].value,
    currentdate: form.elements["curDate"].value,
    description: form.elements["desc"].value,
    assignedTo: selectedUsers,
    status: "ToDo",
  };
}

function getUrgency() {
  let urgencys = document.getElementsByName("choice");
  for (i = 0; i < urgencys.length; i++) {
    if (urgencys[i].checked) return urgencys[i].value;
  }
}

function saveTask() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderUser() {
  let avatarPicker = document.getElementById("avatars");
  avatarPicker.innerHTML = ``;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    avatarPicker.innerHTML += `<img id='user-${i}' onclick='selectUser(${i})' src="../img/${user}.jpg" class="avatar ">`;
  }
}

function selectUser(i) {
  let user = document.getElementById("user-" + i);
  user.classList.toggle("avatar-selected");
  if (selectedUsers.includes(users[i])) {
    selectedUsers = selectedUsers.filter((a) => a != users[i]);
  } else {
    selectedUsers.push(users[i]);
  }
  if (selectedUsers.length == 0) {
    document.getElementById("users").setAttribute("required", "");
  } else {
    document.getElementById("users").removeAttribute("required");
  }
}
