async function initBoard() {
    await init();
    document.getElementById('nav-Board').classList.remove('brd-left-inactive');
    document.getElementById('nav-Board').classList.add('brd-left-active');
    renderBoard();
    adaptMediaQueryBoard();
    addArrows();
}

var taskOnBoard;
let currentDraggedElement;


function renderBoard() {
    resetBoard();
    for (let i = 0; i < backendTasks.length; i++) {
        renderCurrentCol(i);
        for (let j = 0; j < backendTasks[i].assignedTo.length; j++) {
            renderCurrentTaskAvatars(i, j);
        }
    }
}

function resetBoard() {
    document.getElementById("ToDoBoard").innerHTML = "";
    document.getElementById("InProgressBoard").innerHTML = "";
    document.getElementById("TestingBoard").innerHTML = "";
    document.getElementById("DoneBoard").innerHTML = "";
}

function renderCurrentCol(i) {
    taskOnBoard = backendTasks[i];
    let currentBoardCol = document.getElementById(`${taskOnBoard.status}Board`);
    currentBoardCol.innerHTML += templateBoardCards(taskOnBoard, i);
    document.getElementById(`task${i}`).innerHTML = "";
}

function renderCurrentTaskAvatars(i, j) {
    let currentBoardColChild = document.getElementById(`task${i}`);
    currentBoardColChild.innerHTML += templateBoardCardsChild(i, j);
}

function cutString(descr, amount) {
    if (descr.length > amount) {
        descr = descr.slice(0, amount);
        let dots = "...";
        descr = descr.concat(dots);
    }
    return descr;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(category) {
    backendTasks[currentDraggedElement].status = category;
    await backend.setItem("tasks", JSON.stringify(backendTasks));
    renderBoard();
    addArrows();
}

function templateBoardCards(currentTask, i) {
    return `
    <div onclick="showTaskBoardDetail(${i})" draggable="true" ondragstart="startDragging(${i})" class="card-body card-body-board  ${currentTask["category"]} text-start">
        <h6 class=" mb-2 text-muted">${currentTask.duedate}</h6>
        <h5 class="card-title">${currentTask.title}</h5>
        <p class="card-text">${cutString(currentTask.description, 50)}</p>
        <div class="d-flex justify-content-between align-items-center text-end">
            <p class="${currentTask["category"]} border-category">${currentTask.category}</p>
            <p id="task${i}" href="#" class="card-text">IMG of assigned person</p>
        </div>
    </div>
    `;
}

function templateBoardCardsChild(i, j) {
    return `
    <img class="avatar-board" src="${backendUsers[backendTasks[i]["assignedTo"][j]]["src"]}">
    `;
}

window.addEventListener("resize", function(event) {
    adaptMediaQueryBoard();
    addArrows();
});

function adaptMediaQueryBoard() {
    if (window.innerWidth < 1200 && window.innerWidth >= 1000) {
        document.getElementById("resizeid").classList.add("row-cols-2");
        document.getElementById("resizeid").classList.remove("row-cols-4");
        document.getElementById("resizeid").classList.remove("flex-column");
    }
    if (window.innerWidth >= 1200) {
        document.getElementById("resizeid").classList.remove("row-cols-2");
        document.getElementById("resizeid").classList.add("row-cols-4");
    }
    if (window.innerWidth < 1000) {
        document.getElementById("resizeid").classList.remove("row-cols-2");
        document.getElementById("resizeid").classList.remove("row-cols-4");
        document.getElementById("resizeid").classList.add("flex-column");
    }
}

function showTaskBoardDetail(i) {
    document.getElementById('detailBoardCard').classList.remove('d-none');
    renderDetailsBoard(i);
    renderAvatarsBoard(i);
}

function renderDetailsBoard(i) {
    document.getElementById('boardtasktitle').innerHTML = backendTasks[i].title;
    document.getElementById('boardtaskcreatedOn').innerHTML = `Created on: ${backendTasks[i].currentdate}`;
    document.getElementById('boardtaskDueDate').innerHTML = `Due to: ${backendTasks[i].duedate}`;
    document.getElementById('boardtaskDscr').innerHTML = backendTasks[i].description;
    document.getElementById('boardtaskcategory').innerHTML = `<p class="${backendTasks[i]["category"]} border-category">${backendTasks[i].category}</p>`;
    document.getElementById('boardtaskurgency').innerHTML = `<div class="p-${backendTasks[i]["urgency"]}">${capitalizeFirstLetter(backendTasks[i].urgency)}</div>`;
    document.getElementById('boardtaskBy').innerHTML = `Creator: ${backendUsers[backendTasks[i]["creator"]-1].firstName} ${backendUsers[backendTasks[i]["creator"]-1].lastName}`;
    document.getElementById('boardtaskadress').innerHTML = backendUsers[backendTasks[i]["creator"] - 1].email;
    document.getElementById('boardtaskimages').innerHTML = '';
}

function renderAvatarsBoard(i) {
    for (let j = 0; j < backendTasks[i].assignedTo.length; j++) {
        document.getElementById('boardtaskimages').innerHTML += templateBoardCardsChild(i, j);
    }
}

function hideTaskBoardDetail() {
    document.getElementById('detailBoardCard').classList.add('d-none');
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function addArrows() {
    addArrow('ToDoBoard', 'toDo');
    addArrow('InProgressBoard', 'inProgress');
    addArrow('TestingBoard', 'testing');
    addArrow('DoneBoard', 'done');
}

function addArrow(id1, preId) {
    var el = document.getElementById(id1);
    addArrowRight(el, id1, preId);
    addArrowLeft(el, id1, preId);

}

function addArrowRight(el, id1, preId) {
    if (isOverflown(el) == true && el.scrollLeft <= 1 || ((el.scrollWidth - el.scrollLeft) > el.offsetWidth)) {
        if (document.getElementById(`${preId}arrowRight`)) {
            document.getElementById(`${preId}arrowRight`).classList.remove('d-none');
        } else {
            document.getElementById(`${preId}Col`).innerHTML += `<img id="${preId}arrowRight" onclick="scrollNavbarLeft('${id1}','${preId}')" src="../img/arrowright.png" class="scroll-arrow scroll-arrow-left d-none">`;
            document.getElementById(`${preId}arrowRight`).classList.remove('d-none');
        }
    }
}

function addArrowLeft(el, id1, preId) {
    if (isOverflown(el) == true && el.scrollLeft > 0) {
        if (document.getElementById(`${preId}arrowLeft`)) {
            document.getElementById(`${preId}arrowLeft`).classList.remove('d-none');
        } else {
            document.getElementById(`${preId}Col`).innerHTML += `<img id="${preId}arrowLeft" onclick="scrollNavbarRight('${id1}','${preId}')" src="../img/arrowleft.png" class="scroll-arrow scroll-arrow-right d-none">`;
            document.getElementById(`${preId}arrowLeft`).classList.remove('d-none');
        }
    }
}



function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}


function setScrollTimeout(time, preid) {
    removeArrows(preid);
    setTimeout(addArrows, time);
}

function removeArrows(preid) {
    removeArrow(preid);
}

function removeArrow(preId) {
    if (document.getElementById(`${preId}arrowRight`)) {
        document.getElementById(`${preId}arrowRight`).classList.add('d-none');
    }
    if (document.getElementById(`${preId}arrowLeft`)) {
        document.getElementById(`${preId}arrowLeft`).classList.add('d-none');
    }
}


function scrollNavbarRight(id, preid) {
    let offset = document.getElementById(id);
    offset.scrollLeft -= 300;
    setScrollTimeout(225, preid);
}

function scrollNavbarLeft(id, preid) {
    let offset = document.getElementById(id);
    offset.scrollLeft += 300;
    setScrollTimeout(225, preid);
}