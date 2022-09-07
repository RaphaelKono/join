<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Add Task</title>
    <script src="../mini_backend.js"></script>
    <script src="../js/script.js"></script>
    <script defer src="../js/addTask.js"></script>
    <script src="../js/Login.js"></script>
    <link rel="stylesheet" href="../node_modules\bootstrap\dist\css\bootstrap.min.css" />
    <link rel="stylesheet" href="../css/fonts.css" />
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png" />
    <link rel="manifest" href="../favicon/site.webmanifest" />
</head>

<body onload="initAddTask()">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <div w3-include-html="../html/header.html" class="card-header"></div>
            </div>
            <div class="card-body">
                <div class="pb-5 m-1">
                    <h1><b>Add Task</b></h1>
                    <h4>Easily manage your tasks and projects</h4>
                </div>
                <form class="row gy-4 border m-1 p-3 pb-5 needs-validation" id="form" novalidate action="./backlog.html">
                    <div class="col-md-12">
                        <label for="validationDefault01" class="form-label">TITLE</label>
                        <input type="text" class="form-control" id="tasktitle" required />
                        <div class="invalid-feedback">Please choose a title.</div>
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault02" class="form-label">CATEGORY</label>
                        <select class="form-select" aria-label="Default select example" id="category">
                <option selected value="Management">Management</option>
                <option value="Sales">Sales</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
              </select>
                    </div>
                    <div class="col-md-6">
                        <label for="validationDefault03" class="form-label">URGENCY</label>
                        <div class="form-control">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="choice" id="inlineRadio1" value="low" />
                                <label class="form-check-label" for="inlineRadio1">Low</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="choice" id="inlineRadio2" value="medium" checked="checked" />
                                <label class="form-check-label" for="inlineRadio2">Medium</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="choice" id="inlineRadio3" value="high" />
                                <label class="form-check-label" for="inlineRadio3">High</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label for="validationDefault03" class="form-label">DESCRIPTION</label>
                        <textarea class="form-control" id="desc" rows="3" name="textarea"></textarea>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-8 mb-4">
                            <label for="curDate" class="form-label">START DATE</label>
                            <input id="curDate" class="form-control" type="date" />
                        </div>
                        <div class="col-md-8">
                            <label for="dueDate" class="form-label">DUE DATE</label>
                            <input id="dueDate" class="form-control" type="date" required />
                            <div class="invalid-feedback">Please choose a due date.</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12 mb-3">
                            <label for="users" class="form-label" id="assignedTo">ASSIGNED TO</label>
                            <div class="col-md-12 pt-md-3">
                                <div id="avatars"></div>
                            </div>
                            <input type="text" style="display: none" class="form-control" id="users" required />
                            <div class="invalid-feedback">Please choose one or more user.</div>
                        </div>
                        <div class="col-md-12 row">
                            <a class="btn col-md m-2" onclick="window.location.reload()" id="cancel">CANCEL</a>
                            <button class="btn btn-primary col-md m-2" type="submit" id="btn-create">CREATE TASK</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="dialogNewUser" class="container d-none">
        <div id="ContentNewUser">
            <form method="dialog" novalidate id="dialogForm">
                <div id="cross">
                    <img src="../img/cross.png" alt="close" onclick="closeDialog()" />
                </div>
                <div class="mb-3">
                    <label for="fName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="fName" required/>
                    <div class="invalid-feedback">Please choose a first name.</div>
                </div>
                <div class="mb-3">
                    <label for="lName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lName" required/>
                    <div class="invalid-feedback">Please choose a last name.</div>
                </div>
                <div class="mb-3">
                    <label class="form-label row m-1">Profil Picture</label>
                    <img title="neutral" id="userNew-1" onclick="selectNewUser(1)" src="../img/guest-user.png" class="avatar avatar-selected" />
                    <img title="woman" id="userNew-2" onclick="selectNewUser(2)" src="/img/woman-user.png" class="avatar" />
                    <img title="man" id="userNew-3" onclick="selectNewUser(3)" src="../img/man-user.png" class="avatar" />
                </div>
                <button type="submit" class="btn btn-primary">Add User</button>
            </form>
        </div>
    </div>
</body>

</html>
