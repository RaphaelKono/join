async function initBoard() {
    await includeHTML();
    renderBoard();
}

var taskOnBoard;

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
    'status': 'ToDo'
}];

let staff = [{
    'id': 1,
    'name': 'Mark Wahlberg',
    'src': 'img/user1.jpg'
}, {
    'id': 2,
    'name': 'Hannes Zimmermann',
    'src': 'img/user2.jpg'
}];

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

function cutString(descr) {
    if (descr.length > 50) {
        descr = descr.slice(0, 50);
        let dots = '...';
        descr = descr.concat(dots);
    }
    return descr;
}

function templateBoardCards(currentTask) {
    return `
    <div class="card-body card-body-board text-start">
        <h6 class="card-subtitle mb-2 text-muted">${currentTask.currentDate}</h6>
        <h5 class="card-title">${currentTask.title}</h5>
        <p class="card-text">${cutString(currentTask.description)}</p>
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