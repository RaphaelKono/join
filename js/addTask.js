let form = document.getElementById("form");
let formDialog = document.getElementById("dialogForm");
let task = {};
let users = ["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"];
let selectedUsers = [];
let allUsers = [{'firstName': 'John', 'lastName': 'Doe', 'img':'/img/user.jpg'}]
let selectedNewUser = "userNew-1";

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

formDialog.addEventListener(
  "submit",
  function (event) {
    if (formDialog.checkValidity()) addNewUser();
    if (!formDialog.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    formDialog.classList.add("was-validated");
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
  avatarPicker.innerHTML = `<img title="add user" id='user-add' onclick='openDialog()' src="../img/icon plus.png" class="avatar">`;
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

function openDialog() {
  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);
  let newUser = document.getElementById("dialogNewUser");
  newUser.classList.remove("d-none");
  selectNewUser(1);
}

function selectNewUser(i) {
  let user = document.getElementById("userNew-" + i);
  if (i != 1) user.classList.toggle("avatar-selected");
  if (selectedNewUser.includes("userNew-" + i)) {
    selectedNewUser = "userNew-1";
    document.getElementById("userNew-1").classList.add("avatar-selected");
  } else {
    selectedNewUser = "userNew-" + i;
    if (i == 1) {
      document.getElementById("userNew-1").classList.add("avatar-selected");
    }
    for (let j = 1; j < 4; j++) {
      if(j == i) continue;
      document.getElementById("userNew-" + j).classList.remove("avatar-selected");
    }
  }
}

function addNewUser(){
let newUser = {
'firstName': document.getElementById('fName').value,
'lastName' : document.getElementById('lName').value,
'img' : document.getElementById(selectedNewUser).src
};
allUsers.push(newUser);
users.push(newUser.img.split('/img/')[1]);
renderUser();
formDialog.reset();
closeDialog();
}

function closeDialog() {
  document.body.style.overflow = "auto";
  document.getElementById("dialogNewUser").classList.add("d-none");
}







