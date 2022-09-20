let form = document.getElementById("form");
let task;
let selectedUsers = [];
let editTaskId;

async function initBacklog() {
  await init();
  document.getElementById("nav-Backlog").classList.remove("brd-left-inactive");
  document.getElementById("nav-Backlog").classList.add("brd-left-active");
  renderBacklog();
  renderUser();
}

function cutString(descr, amount) {
  if (descr.length > amount) {
    descr = descr.slice(0, amount);
    let dots = "...";
    descr = descr.concat(dots);
  }
  return descr;
}

async function deleteTask(i) {
  backendTasks.splice(i, 1);
  await backend.setItem("tasks", JSON.stringify(backendTasks));
  renderBacklog();
}

function renderBacklog() {
  let loadTasks = document.getElementById("backlogContent");
  loadTasks.innerHTML = "";
  for (let i = 0; i < backendTasks.length; i++) {
    const task = backendTasks[i];
    loadTasks.innerHTML += renderBacklogHMTL(i, task);
  }
}

function renderBacklogHMTL(i, task) {
  return `
    <div class="bg ${task["urgency"]} ${task["category"]}">
        <div class="contentAvatar">
            <div><img src="${backendUsers[task["creator"] - 1]["src"]}" class="avatarBacklog"></div>
            <div class="mailContainer"><div><p>${backendUsers[task["creator"] - 1]["firstName"]} ${
    backendUsers[task["creator"] - 1]["lastName"]
  }</p>
            <p class="mail">${backendUsers[task["creator"] - 1]["email"].toLowerCase()}</p></div></div>
        </div>
        <div class="contentCategory"><p class="contentTextCategory ${task["category"]}"><b>${
    task["category"]
  }</b></p></div>
        <div class="contentDescription">
            <div><p><b>${task["title"]} / Ticket-ID: ${i + 1}</b></p></div>
            <div><p class="text">${cutString(task["description"], 80)}</p></div>
        </div>
        <div class="contentEdit">
            <div><a  onclick="deleteTask(${i})"><img src="../img/delete.png" class="iconBacklog"></a></div>
            <div><a  onclick="editTask(${i})"><img src="../img/edit.png" class="iconBacklog"></a></div>
        </div>
    </div>
        `;
}

formbl.addEventListener(
  "submit",
  function (event) {
    if (!formbl.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    formbl.classList.add("was-validated");
  },
  false
);

function editTask(id) {
  document.getElementById("dialogEditTask").classList.remove("d-none");
  document.body.style.overflow = "hidden";
  setEditTask(id);
  editTaskId = id;
}

function setEditTask(id) {
  let editTasks = backendTasks[id];
  formbl.elements["tasktitle"].value = editTasks["title"];
  formbl.elements["category"].value = editTasks["category"];
  formbl.elements["dueDate"].value = editTasks["duedate"];
  let urgencys = document.getElementsByName("choice");
  for (i = 0; i < urgencys.length; i++) {
    if (urgencys[i].value == editTasks["urgency"]) urgencys[i].checked = "checked";
  }
  formbl.elements["curDate"].value = editTasks["currentdate"];
  formbl.elements["desc"].value = editTasks["description"];
  editTasks["assignedTo"].forEach((element) => {
    selectUser(element);
  });
  selectedUsers = editTasks["assignedTo"];
}

async function saveEditTask() {
  if (formbl.checkValidity()) {
    setTask();
    backendTasks[editTaskId] = task;
    await backend.setItem("tasks", JSON.stringify(backendTasks));
    window.location.href = "backlog.html";
  }
}

function setTask() {
  task = {
    title: formbl.elements["tasktitle"].value,
    urgency: getUrgency(),
    category: formbl.elements["category"].value,
    duedate: formbl.elements["dueDate"].value,
    currentdate: formbl.elements["curDate"].value,
    description: formbl.elements["desc"].value,
    assignedTo: selectedUsers,
    creator: backendTasks[editTaskId]["creator"],
    status: backendTasks[editTaskId]["status"],
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
  for (let i = 0; i < backendUsers.length; i++) {
    const user = backendUsers[i];
    avatarPicker.innerHTML += `<img title="${user["firstName"]} ${user["lastName"]}" id='user-${i}' onclick='selectUser(${i})' src="${user["src"]}" class="avatar ">`;
  }
}

function selectUser(i) {
  let user = document.getElementById("user-" + i);
  user.classList.toggle("avatar-selected");
  if (selectedUsers.includes(i)) {
    selectedUsers = selectedUsers.filter((a) => a != i);
  } else {
    selectedUsers.push(i);
  }
  if (selectedUsers.length == 0) {
    document.getElementById("users").setAttribute("required", "");
  } else {
    document.getElementById("users").removeAttribute("required");
  }
}

function renderUrg() {
  removeColor(4);
  document.getElementById("sort-4").classList.add("color-blue");
  backendTasks.sort(function (x, y) {
    let a = x.urgency,
      b = y.urgency;
    a = a == "low" ? 2 : a == "medium" ? 1 : 0;
    b = b == "low" ? 2 : b == "medium" ? 1 : 0;
    return a == b ? 0 : a > b ? 1 : -1;
  });
  renderBacklog();
}

function renderCat() {
  removeColor(2);
  document.getElementById("sort-2").classList.add("color-blue");
  backendTasks.sort((a, b) => a["category"].localeCompare(b["category"]));
  renderBacklog();
}

function renderNam() {
  removeColor(1);
  document.getElementById("sort-1").classList.add("color-blue");
  backendTasks.sort((a, b) => a["creator"] - b["creator"]);
  renderBacklog();
}

function renderTit() {
  removeColor(3);
  document.getElementById("sort-3").classList.add("color-blue");
  backendTasks.sort((a, b) => a["title"].localeCompare(b["title"]));
  renderBacklog();
}

function removeColor(i) {
  for (let index = 1; index < 5; index++) {
    if (index == i) continue;
    document.getElementById("sort-" + index).classList.remove("color-blue");
  }
}
