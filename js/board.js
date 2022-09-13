async function initBoard() {
    await init();
    document.getElementById('nav-Board').classList.remove('brd-left-inactive');
    document.getElementById('nav-Board').classList.add('brd-left-active');
    renderBoard();
}

var taskOnBoard;
let currentDraggedElement;

let boardTasks = [{
        title: "Prepare presentation",
        id: 1,
        urgency: "Medium",
        category: "Marketing",
        dueDate: "XX.XX.XXXX",
        currentDate: "ZZ.ZZ.ZZZZ",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.",
        assignedTo: [1],
        status: "Done",
    },
    {
        title: "Present presentation",
        id: 2,
        urgency: "Medium",
        category: "Managment",
        dueDate: "XX.XX.XXXX",
        currentDate: "ZZ.ZZ.ZZZZ",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.",
        assignedTo: [2, 1],
        status: "ToDo",
        creator: [2],
    },
];

let staff = [{
        id: 1,
        userName: "user1",
        password: "short",
        firstName: "Bruce",
        lastName: "Humphrey",
        email: "Bruce.Humphrey@join.de",
        src: "img/user1.jpg",
    },
    {
        id: 2,
        userName: "user1",
        password: "short",
        firstName: "Hamza",
        lastName: "Paul",
        email: "Hamza.Paul@join.de",
        src: "img/user2.jpg",
    },
    {
        id: 2,
        userName: "user1",
        password: "short",
        firstName: "Stella",
        lastName: "Hayes",
        email: "Stella.Hayes@join.de",
        src: "img/user2.jpg",
    },
    {
        id: 2,
        userName: "user1",
        password: "short",
        firstName: "Brian",
        lastName: "McBride",
        email: "Brian.McBride@join.de",
        src: "img/user2.jpg",
    },
    {
        id: 2,
        userName: "guest",
        password: "short",
        firstName: "guest",
        lastName: "guest",
        email: "guest@join.de",
        src: "img/user2.jpg",
    },
];

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

function moveTo(category) {
    backendTasks[currentDraggedElement].status = category;
    localStorage.setItem("tasks", JSON.stringify(backendTasks));
    renderBoard();
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
});

function showTaskBoardDetail(i) {
    document.getElementById('detailBoardCard').classList.remove('d-none');
    document.getElementById('boardtasktitle').innerHTML = backendTasks[i].title;
    document.getElementById('boardtaskcreatedOn').innerHTML = backendTasks[i].currentdate;
    document.getElementById('boardtaskDueDate').innerHTML = backendTasks[i].duedate;
    document.getElementById('boardtaskDscr').innerHTML = backendTasks[i].description;
    document.getElementById('boardtaskcategory').innerHTML = backendTasks[i].category;
    document.getElementById('boardtaskimages').innerHTML = backendTasks[i].assignedTo;
    document.getElementById('boardtaskurgency').innerHTML = backendTasks[i].urgency;


}

function hideTaskBoardDetail() {
    document.getElementById('detailBoardCard').classList.add('d-none');
}