let form = document.getElementById("form");
let task = {};
let users = ["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"];
let selectedUsers = [];
let editTaskId;

async function init() {
  await includeHTML();
  renderUser();
}

form.addEventListener(
  "submit",
  function (event) {
    if (form.checkValidity()) saveEditTask();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  },
  false
);

function editTask(id) {
  document.getElementById("dialogEditTask").classList.remove("d-none");
  setEditTask(id);
  editTaskId = id;
}

function setEditTask(id){
  tasks = JSON.parse(localStorage.getItem("tasks"));
  form.elements["tasktitle"].value = tasks[id]["title"];
  form.elements["category"].value = tasks[id]["category"];
  form.elements["dueDate"].value = tasks[id]["duedate"];
  let urgencys = document.getElementsByName("choice");
  for (i = 0; i < urgencys.length; i++) {
    if (urgencys[i].value == tasks[id]["urgency"]) urgencys[i].checked = "checked";
  }
  form.elements["curDate"].value = tasks[id]["currentdate"];
  form.elements["desc"].value = tasks[id]["description"];
  tasks[id]["assignedTo"].forEach((element) => {
    let i = element.replace("user", "");
    selectUser(i - 1);
  });
  selectedUsers = tasks[id]['assignedTo'];
}

function saveEditTask(){
  setTask();
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[editTaskId] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

function renderUser() {
  let avatarPicker = document.getElementById("avatars");
  avatarPicker.innerHTML = ``;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    avatarPicker.innerHTML += `<img title="${user}" id='user-${i}' onclick='selectUser(${i})' src="../img/${user}" class="avatar ">`;
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





