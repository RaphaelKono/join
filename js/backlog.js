async function initBacklog() {
    await includeHTML();
    renderBacklog();
}

let titles = [];

let editedTasks = [];

let tasks = [{
    'title': 'Testtitle1',
    'id': 1,
    'urgency': 'high',
    'category': 'Software-Department',
    'dueDate': '20. Oktober 2022',
    'currentDate': '29. August 2022',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'assignedTo': {
        'name': 'Mark Wahlberg',
        'src': './img/icons8-calendar-150.png'
    },
    'status': 'ToDo'
},
{
    'title': 'Testtitle2',
    'id': 2,
    'urgency': 'low',
    'category': 'Management',
    'dueDate': '15. September 2022',
    'currentDate': '29. August 2022',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'assignedTo': {
        'name': 'Cristina Jordi',
        'src': './img/icon plus.png'
    },
    'status': 'InProgress'
},
{
    'title': 'Testtitle3',
    'id': 3,
    'urgency': 'medium',
    'category': 'Sales',
    'dueDate': '20. Oktober 2022',
    'currentDate': '29. August 2022',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'assignedTo': {
        'name': 'Mark Wahlberg',
        'src': './img/icons8-calendar-150.png'
    },
    'status': 'ToDo'
},
{
    'title': 'Testtitle4',
    'id': 4,
    'urgency': 'high',
    'category': 'Management',
    'dueDate': '20. Oktober 2022',
    'currentDate': '29. August 2022',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'assignedTo': {
        'name': 'Mark Wahlberg',
        'src': './img/icons8-calendar-150.png'
    },
    'status': 'ToDo'
}];

load();

function renderBacklog() {
    let loadTasks = document.getElementById('backlogContent');
    loadTasks.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let staffSrc = tasks[i].assignedTo.src;
        let staffName = tasks[i].assignedTo.name;
        let taskTitle = tasks[i].title;
        let taskId = tasks[i].id;
        let taskUrgency = tasks[i].urgency;
        let taskCategory = tasks[i].category;
        let taskDueDate = tasks[i].dueDate;
        let taskCurrentDate = tasks[i].currentDate;
        let taskDescription = tasks[i].description;
        let taskStatus = tasks[i].status;

        loadTasks.innerHTML += renderBacklogHMTL(i, staffSrc, staffName, taskTitle, taskId, taskUrgency, taskCategory,
            taskDueDate, taskCurrentDate, taskDescription, taskStatus);
    }
}

function renderBacklogHMTL(i, staffSrc, staffName, taskTitle, taskId, taskUrgency, taskCategory,
    taskDueDate, taskCurrentDate, taskDescription, taskStatus) {
    return `
    <div class="bg ${taskUrgency}">
        <div class="contentAvatar">
            <div><img src="${staffSrc}" class="iconAvatarBacklog"></div>
            <div><p>${staffName}</p></div>
        </div>

        <div class="contentCategory ${taskCategory}"><p>${taskCategory}</p></div>

        <div class="contentDescription">
            <div><p><b>${taskTitle} / Ticket-ID: ${taskId}</b></p></div>
            <div><p class="text">${taskDescription}</p></div>
        </div>

        <div class="contentEdit">
            <div><a href="#" onclick="deleteTask(${i})"><img src="./img/delete.png" class="iconBacklog"></a></div>
            <div><a href="#" onclick="editTask(${i})"><img src="./img/edit.png" class="iconBacklog"></a></div>
        </div>

        <!--
        <div><p>Dringlichkeit: ${taskUrgency}</p>
        <div><p>Ticket erledigt bis: ${taskDueDate}</p>
        <div><p>Task erfasst am: ${taskCurrentDate}</p>
        <div><p>Ticket Status: ${taskStatus}</p>
        </div>
        -->
    </div>
        `;
}

function deleteTask(i) {
    tasks.splice(i, 1);
    renderBacklog();

    save();
}

function editTask(i) {
    editedTasks.push(tasks[i]);
    window.location.href = "addTask.html";
}

function save() {
    let TitleAsText = JSON.stringify(titles);
    localStorage.setItem('titles', TitleAsText);
}

function load() {
    let TitleAsText = localStorage.getItem('titles');
    if (TitleAsText) {
        titles = JSON.parse(TitleAsText);
    }
}