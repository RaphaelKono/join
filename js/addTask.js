let form = document.getElementById("form");
let formDialog = document.getElementById("dialogForm");
let task;
let selectedUsers = [];
let selectedNewUser = "userNew-1";
let storedUser = localStorage.getItem("currentID");
let currentLoggedUser = JSON.parse(storedUser);
currentUser.push(storedUser);


async function addUser() {
    await backend.setItem("users", JSON.stringify(staff));
    await backend.setItem("tasks", JSON.stringify(tasks));
}

async function addTasksToServer() {
    await backend.setItem("tasks", JSON.stringify(tasks));
}

async function initAddTask() {
    localStorage.clear();
    await init();
    renderUser();
    form.elements["curDate"].value = new Date().toJSON().split("T")[0];
}

form.addEventListener(
    "submit",
    function(event) {

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add("was-validated");
        if (form.checkValidity()) addTask();
    },
    false
);

formDialog.addEventListener(
    "submit",
    function(event) {
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
    // window.location.href = 'backlog.html';
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
    tasks.push(task);
    //backendTasks.push(task);
    //backend.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderUser() {
    let avatarPicker = document.getElementById("avatars");
    avatarPicker.innerHTML = `<img title="add user" id='user-add' onclick='openDialog()' src="../img/icon plus.png" class="avatar">`;
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
            if (j == i) continue;
            document
                .getElementById("userNew-" + j)
                .classList.remove("avatar-selected");
        }
    }
}

function addNewUser() {
    let newUser = {
        firstName: document.getElementById("fName").value,
        lastName: document.getElementById("lName").value,
        img: document.getElementById(selectedNewUser).src,
    };
    allUsers.push(newUser);
    users.push(newUser.img.split("/img/")[1]);
    renderUser();
    formDialog.reset();
    closeDialog();
}

function closeDialog() {
    document.body.style.overflow = "auto";
    document.getElementById("dialogNewUser").classList.add("d-none");
}
