async function initBoard() {
    await includeHTML();
    renderBoard();
}

let boardTasks = [{
    'title': 'Prepare presentation',
    'id': 1,
    'urgency': 'Medium',
    'category': 'Marketing',
    'dueDate': 'XX.XX.XXXX',
    'currentDate': 'ZZ.ZZ.ZZZZ',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.',
    'assignedTo': [1],
    'status': 'ToDo'
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
    'src': 'img/Markwahlberg'
}];

function renderBoard() {
    console.log('loaded');
    let toDoBoard = document.getElementById('toDoBoard');
    toDoBoard.innerHTML = '';
    for (let i = 0; i < boardTasks.length; i++) {
        const taskOnBoard = boardTasks[i];
        toDoBoard.innerHTML += templateBoardCards(taskOnBoard);
        for (let j = 0; j < taskOnBoard.assignedTo.length; j++) {
            const avatarId = taskOnBoard.assignedTo[j];
            const imgSrc = staff.filter(() => staff.id === avatarId);
            toDoBoard.innerHTML += templateBoardCardsChild(imgSrc);
        }

    }
}

function templateBoardCards(currentTask) {
    return `
    <div class="card-body card-body-board text-start">
        <h6 class="card-subtitle mb-2 text-muted">${currentTask.currentDate}</h6>
        <h5 class="card-title">${currentTask.title}</h5>
        <p class="card-text">${currentTask.description}</p>
        <div class="d-flex justify-content-between text-end">
            <a href="#" class="btn btn-primary ${currentTask.currentDate}">${currentTask.category}</a>
            <a id="task${currentTask.id}" href="#" class="card-link">IMG of assigned person</a>
        </div>
    </div>
    `
}

function templateBoardCardsChild(imgSrc) {
    return `
    <img class="avatar-board" src="${imgSrc}">
    `;
}