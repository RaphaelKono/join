async function init() {
    await includeHTML();
    renderBacklog();
}

let titles = [];

let editedTasks = [];

let tasksBacklog = [{
    'title': 'Testtitle1',
    'id': 1,
    'urgency': 'high',
    'category': 'Software-Department',
    'dueDate': '20. Oktober 2022',
    'currentDate': '29. August 2022',
    'description': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'creator': {
        'name': 'Mark Wahlberg',
        'src': '../img/user1.jpg'
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
    'creator': {
        'name': 'Cristina Jordi',
        'src': '../img/user2.jpg'
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
    'creator': {
        'name': 'Mark Wahlberg',
        'src': '../img/user1.jpg'
    },
    'status': 'ToDo'
}];

load();

function renderBacklog() {
    let loadTasks = document.getElementById('backlogContent');
    loadTasks.innerHTML = '';
    for (let i = 0; i < tasksBacklog.length; i++) {
        let staffSrc = tasksBacklog[i].creator.src;
        let staffName = tasksBacklog[i].creator.name;
        let taskTitle = tasksBacklog[i].title;
        let taskId = tasksBacklog[i].id;
        let taskUrgency = tasksBacklog[i].urgency;
        let taskCategory = tasksBacklog[i].category;
        let taskDueDate = tasksBacklog[i].dueDate;
        let taskCurrentDate = tasksBacklog[i].currentDate;
        let taskDescription = tasksBacklog[i].description;
        let taskStatus = tasksBacklog[i].status;
        loadTasks.innerHTML += renderBacklogHMTL(i, staffSrc, staffName, taskTitle, taskId, taskUrgency, taskCategory,
            taskDueDate, taskCurrentDate, taskDescription, taskStatus);
    }
}

function renderBacklogHMTL(i, staffSrc, staffName, taskTitle, taskId, taskUrgency, taskCategory,
    taskDueDate, taskCurrentDate, taskDescription, taskStatus) {
    return `
    <div class="bg ${taskUrgency} ${taskCategory}">
        <div class="contentAvatar">
            <div><img src="${staffSrc}" class="avatar"></div>
            <div><p>${staffName}</p></div>
        </div>

        <div class="contentCategory"><p>${taskCategory}</p></div>

        <div class="contentDescription">
            <div><p><b>${taskTitle} / Ticket-ID: ${taskId}</b></p></div>
            <div><p class="text">${cutString(taskDescription, 200)}</p></div>
        </div>

        <div class="contentEdit">
            <div><a href="#" onclick="deleteTask(${i})"><img src="../img/delete.png" class="iconBacklog"></a></div>
            <div><a href="#" onclick="editTask(${i})"><img src="../img/edit.png" class="iconBacklog"></a></div>
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

function cutString(descr, amount) {
    if (descr.length > amount) {
        descr = descr.slice(0, amount);
        let dots = '...';
        descr = descr.concat(dots);
    }
    return descr;
}

function deleteTask(i) {
    tasksBacklog.splice(i, 1);
    renderBacklog();

    save();
}

function editTask(i) {
    editedTasks.push(tasksBacklog[i]);
    window.location.href = "addTaskbacklog.html";
}

function save() {
    let TitleAsText = JSON.stringify(titles);
    backend.setItem('titles', TitleAsText);
}

function load() {
    let TitleAsText = backend.getItem('titles');
    if (TitleAsText) {
        titles = JSON.parse(TitleAsText);
    }
}