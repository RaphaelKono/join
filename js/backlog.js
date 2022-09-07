let form = document.getElementById("form");
let task;
let selectedUsers = [];
let editTaskId;

async function initBacklog() {
  await init();
  await includeHTML();
  document.getElementById('nav-Backlog').classList.remove('brd-left-inactive');
  document.getElementById('nav-Backlog').classList.add('brd-left-active');
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

function deleteTask(i) {
  backendTasks.splice(i, 1);
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderBacklog();
}

function renderBacklog() {
  let loadTasks = document.getElementById("backlogContent");
  loadTasks.innerHTML = "";
  //backendTasks.reverse();
  for (let i = 0; i < backendTasks.length; i++) {
    const task = backendTasks[i];
    loadTasks.innerHTML += renderBacklogHMTL(i, task);
  }
}

function renderBacklogHMTL(i, task) {
  return `
    <div class="bg ${task["urgency"]} ${task["category"]}">
        <div class="contentAvatar">
            <div><img src="${
              backendUsers[task["creator"] - 1]["src"]
            }" class="avatarBacklog"></div>
            <div><p>${backendUsers[task["creator"] - 1]["firstName"]} ${
    backendUsers[task["creator"] - 1]["lastName"]
  }</p>
            <p>${backendUsers[task["creator"] - 1]["email"]}</p></div>
        </div>

        <div class="contentCategory"><p class="contentTextCategory ${task["category"]}"><b>${task["category"]}</b></p></div>

        <div class="contentDescription">
            <div><p><b>${task["title"]} / Ticket-ID: ${i + 1}</b></p></div>
            <div><p class="text">${cutString(task["description"], 200)}</p></div>
        </div>

        <div class="contentEdit">
            <div><a href="#" onclick="deleteTask(${i})"><img src="../img/delete.png" class="iconBacklog"></a></div>
            <div><a href="#" onclick="editTask(${i})"><img src="../img/edit.png" class="iconBacklog"></a></div>
        </div>

        <!--
        <div><p>Dringlichkeit: ${task["urgency"]}</p>
        <div><p>Ticket erledigt bis: ${task["duedate"]}</p>
        <div><p>Task erfasst am: ${task["currentdate"]}</p>
        <div><p>Ticket Status: ${task["status"]}</p>
        </div>
        -->
    </div>
        `;
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

function setEditTask(id) {
  let editTasks = backendTasks[id];
  form.elements["tasktitle"].value = editTasks["title"];
  form.elements["category"].value = editTasks["category"];
  form.elements["dueDate"].value = editTasks["duedate"];
  let urgencys = document.getElementsByName("choice");
  for (i = 0; i < urgencys.length; i++) {
    if (urgencys[i].value == editTasks["urgency"]) urgencys[i].checked = "checked";
  }
  form.elements["curDate"].value = editTasks["currentdate"];
  form.elements["desc"].value = editTasks["description"];
  editTasks["assignedTo"].forEach((element) => {
    selectUser(element);
  });
  selectedUsers = editTasks["assignedTo"];
}

function saveEditTask() {
  setTask();
  backendTasks[editTaskId] = task;
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
  backendTasks.sort(function (x, y) {
    let a = x.urgency,
      b = y.urgency;
    a = a == "low" ? 2 : a == "medium" ? 1 : 0;
    b = b == "low" ? 2 : b == "medium" ? 1 : 0;
    return a == b ? 0 : a > b ? 1 : -1;
  });
  localStorage.setItem("tasks", JSON.stringify(backendTasks));
  renderBacklog();
}

function renderCat() {
  backendTasks.sort((a, b) => a["category"].localeCompare(b["category"]));
  localStorage.setItem("tasks", JSON.stringify(backendTasks));
  renderBacklog();
}

function renderNam() {
  //backendTasks.sort((a, b) => a["creator"].localeCompare(b["creator"]));
  backendTasks.sort((a, b) => a["creator"] - b["creator"]);
  localStorage.setItem("tasks", JSON.stringify(backendTasks));
  renderBacklog();
}

function renderTit() {
  backendTasks.sort((a, b) => a["title"].localeCompare(b["title"]));
  localStorage.setItem("tasks", JSON.stringify(backendTasks));
  renderBacklog();
}
