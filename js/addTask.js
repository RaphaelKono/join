let form = document.getElementById("form");
let task;
let selectedUsers = [];

async function initAddTask() {
  await init();
  renderUser();
  document.getElementById("nav-AddTask").classList.remove("brd-left-inactive");
  document.getElementById("nav-AddTask").classList.add("brd-left-active");
  form.elements["curDate"].value = new Date().toJSON().split("T")[0];
}

function renderUser() {
  let avatarPicker = document.getElementById("avatars");
  avatarPicker.innerHTML = ``;
  for (let i = 0; i < backendUsers.length; i++) {
    const user = backendUsers[i];
    avatarPicker.innerHTML += `<img title="${user["firstName"]} ${user["lastName"]}" id='user-${i}' onclick='selectUser(${i})' src="${user["src"]}" class="avatar">`;
  }
}

form.addEventListener(
  "submit",
  function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  },
  false
);

async function addTask() {
  if (form.checkValidity()) {
    setTask();
    await saveTask();
    window.location.href = "backlog.html";
  }
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
    creator: currentUserId,
  };
}

function getUrgency() {
  let urgencys = document.getElementsByName("choice");
  for (i = 0; i < urgencys.length; i++) {
    if (urgencys[i].checked) return urgencys[i].value;
  }
}

async function saveTask() {
  await backendTasks.push(task);
  await backend.setItem("tasks", JSON.stringify(backendTasks));
}

function selectUser(i) {
  let user = document.getElementById("user-" + i);
  user.classList.toggle("avatar-selected");
  if (selectedUsers.includes(i)) selectedUsers = selectedUsers.filter((a) => a != i);
  else selectedUsers.push(i);
  if (selectedUsers.length == 0) document.getElementById("users").setAttribute("required", "");
  else document.getElementById("users").removeAttribute("required");
}
