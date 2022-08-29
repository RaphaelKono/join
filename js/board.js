async function initBoard() {
    await includeHTML();
    loadBoard();
}

let boardTasks = [{
    'title': 'Prepare presentation',
    'id': 1,
    'urgency': 'Medium',
    'category': 'Marketing',
    'dueDate': 'XX.XX.XXXX',
    'currentDate': 'ZZ.ZZ.ZZZZ',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.',
    'assignedTo': 1,
    'status': 'ToDo'
}, {
    'title': 'Present presentation',
    'id': 2,
    'urgency': 'Medium',
    'category': 'Managment',
    'dueDate': 'XX.XX.XXXX',
    'currentDate': 'ZZ.ZZ.ZZZZ',
    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, inventore possimus accusamus rem repudiandae numquam hic accusantium ratione corrupti, iste laborum facilis voluptas praesentium nobis omnis provident itaque ea quis.',
    'assignedTo': 'CEO',
    'status': 'ToDo'
}];

let staff = [{
    'id': 1,
    'name': 'Mark Wahlberg',
    'src': 'img/Markwahlberg'
}];

function loadBoard() {
    let createdAt = document.getElementById('createdAtBoard');
    let title = document.getElementById('titleBoard');
    let description = document.getElementById('descriptionBoard');
    let categories = document.getElementById('categoryBoard');
    let avatars = document.getElementById('avatarsBoard');
}