// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  
  let tasks = [];
  let task = {};
  let form = document.getElementById("form");
  let submit = document.getElementById("button");
  let assignUser = [];
  submit.addEventListener("click", addTask);
  
  function addTask() {
    setTask();
    saveTask();
  }
  
  function setTask() {
    task = {
      title: form.elements["tasktitle"].value,
      urgency: getUrgency(),
      category: form.elements["category"].value,
      duedate: form.elements["dueDate"].value,
      currentdate: form.elements["curDate"].value || new Date().toJSON().split("T")[0],
      description: form.elements["desc"].value,
      assignedTo: assignUser,
      status: "ToDo",
    };
  }
  
  function getUrgency() {
    let urgencys = document.getElementsByName("choice");
    for (i = 0; i < urgencys.length; i++) {
      if (urgencys[i].checked) return urgencys[i].value;
    }
  }
  
  
  function isAssigned() {
    let assignedTos = document.querySelectorAll('input[type="checkbox"]');
    for (i = 0; i < assignedTos.length; i++) {
      if (assignedTos[i].checked) assignUser.push(assignedTos[i].value);
    }
    if (!assignUser.length) {
      for (const assign of assignedTos) {
        assign.setAttribute("required", "");
      }
    } else {
      for (const assign of assignedTos) {
        assign.removeAttribute("required");
      }
    }
  }
  
  function init() {
    isAssigned();
    let store = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("test").innerHTML = store.length;
  }
  
  function saveTask() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  