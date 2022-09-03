async function initBoard() {
    await includeHTML();
    renderBoard();
}

var taskOnBoard;
let currentDraggedElement;

let boardTasks = [{
    'title': 'Prepare presentation',
    'id': 1,
    'urgency': 'Medium',
    'category': 'Marketing',
    'dueDate': 'XX.XX.XXXX',
    'currentDate': 'ZZ.ZZ.ZZZZ',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.',
    'assignedTo': [1],
    'status': 'Done'
}, {
    'title': 'Present presentation',
    'id': 2,
    'urgency': 'Medium',
    'category': 'Managment',
    'dueDate': 'XX.XX.XXXX',
    'currentDate': 'ZZ.ZZ.ZZZZ',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.',
    'assignedTo': [2, 1],
    'status': 'ToDo',
    'creator': [2]
}];

let staff = [{
        'id': 1,
        'userName': 'user1',
        'password': 'short',
        'firstName': 'Bruce',
        'lastName': 'Humphrey',
        'email': 'Bruce.Humphrey@join.de',
        'src': 'img/user1.jpg'
    }, {
        'id': 2,
        'userName': 'user1',
        'password': 'short',
        'firstName': 'Hamza',
        'lastName': 'Paul',
        'email': 'Hamza.Paul@join.de',
        'src': 'img/user2.jpg'
    },
    {
        'id': 2,
        'userName': 'user1',
        'password': 'short',
        'firstName': 'Stella',
        'lastName': 'Hayes',
        'email': 'Stella.Hayes@join.de',
        'src': 'img/user2.jpg'
    },
    {
        'id': 2,
        'userName': 'user1',
        'password': 'short',
        'firstName': 'Brian',
        'lastName': 'McBride',
        'email': 'Brian.McBride@join.de',
        'src': 'img/user2.jpg'
    },
    {
        'id': 2,
        'userName': 'guest',
        'password': 'short',
        'firstName': 'guest',
        'lastName': 'guest',
        'email': 'guest@join.de',
        'src': 'img/user2.jpg'
    }
];

function renderBoard() {
    resetBoard();
    for (let i = 0; i < boardTasks.length; i++) {
        renderCurrentCol(i);
        for (let j = 0; j < taskOnBoard.assignedTo.length; j++) {
            renderCurrentTaskAvatars(i, j);
        }
    }
}

function resetBoard() {
    document.getElementById('ToDoBoard').innerHTML = '';
    document.getElementById('InProgressBoard').innerHTML = '';
    document.getElementById('TestingBoard').innerHTML = '';
    document.getElementById('DoneBoard').innerHTML = '';
}

function renderCurrentCol(i) {
    taskOnBoard = boardTasks[i];
    let currentBoardCol = document.getElementById(`${taskOnBoard.status}Board`);
    currentBoardCol.innerHTML += templateBoardCards(taskOnBoard);
    document.getElementById(`task${i+1}`).innerHTML = '';
}

function renderCurrentTaskAvatars(i, j) {
    let currentBoardColChild = document.getElementById(`task${i+1}`)
    const avatarId = taskOnBoard.assignedTo[j];
    const imgSrc = staff.find((element) => element.id == avatarId);
    currentBoardColChild.innerHTML += templateBoardCardsChild(imgSrc.src);
}

function cutString(descr, amount) {
    if (descr.length > amount) {
        descr = descr.slice(0, amount);
        let dots = '...';
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
    boardTasks[currentDraggedElement - 1].status = category;
    renderBoard();
}

function templateBoardCards(currentTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${currentTask.id})" class="card-body card-body-board text-start">
        <h6 class="card-subtitle mb-2 text-muted">${currentTask.currentDate}</h6>
        <h5 class="card-title">${currentTask.title}</h5>
        <p class="card-text">${cutString(currentTask.description, 50)}</p>
        <div class="d-flex justify-content-between align-items-center text-end">
            <a href="#" class="btn btn-primary ${currentTask.currentDate}">${currentTask.category}</a>
            <p id="task${currentTask.id}" href="#" class="card-text">IMG of assigned person</p>
        </div>
    </div>
    `
}

function templateBoardCardsChild(imgSrc) {
    return `
    <img class="avatar-board" src="../${imgSrc}">
    `;
}

window.addEventListener('resize', function(event) {
    if (window.innerWidth < 1200 && window.innerWidth >= 800) {
        document.getElementById('resizeid').classList.add('row-cols-2');
        document.getElementById('resizeid').classList.remove('row-cols-4');
    }
    if (window.innerWidth >= 1200) {
        document.getElementById('resizeid').classList.remove('row-cols-2');
        document.getElementById('resizeid').classList.add('row-cols-4');
    }
    if (window.innerWidth < 1000) {
        document.getElementById('resizeid').classList.remove('row-cols-2');
        document.getElementById('resizeid').classList.add('row-cols-4');
        document.getElementById('resizeid').classList.add('flex-column');
    }
    if (window.innerWidth >= 1000) {
        document.getElementById('resizeid').classList.add('row-cols-2');
        document.getElementById('resizeid').classList.remove('flex-column');
    }
});