const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#regrister");

let currentUser = [];
let user = [{
        id: 1,
        username: "user1",
        password: "short",
        firstName: "Bruce",
        lastName: "Humphrey",
        email: "Bruce.Humphrey@join.de",
        src: "../img/user1.jpg",
    },
    {
        id: 2,
        username: "user2",
        password: "short",
        firstName: "Hamza",
        lastName: "Paul",
        email: "Hamza.Paul@join.de",
        src: "../img/user2.jpg",
    },
    {
        id: 3,
        username: "user3",
        password: "short",
        firstName: "Stella",
        lastName: "Hayes",
        email: "Stella.Hayes@join.de",
        src: "../img/user3.jpg",
    },
    {
        id: 4,
        username: "user4",
        password: "short",
        firstName: "Brian",
        lastName: "McBride",
        email: "Brian.McBride@join.de",
        src: "../img/user4.jpg",
    },
    {
        id: 5,
        username: "guest",
        password: "short",
        firstName: "Guest",
        lastName: "Anonymus",
        email: "guest@join.de",
        src: "../img/guest-user.jpg",
    },
];




function sumbit() {
    loginForm.classList.remove("form_hidden");
    createAccountForm.classList.add("form_hidden");
}



function createAcc() {
    loginForm.classList.add("form_hidden");
    createAccountForm.classList.remove("form_hidden");
}



function login() {
    var username = document.getElementById('loginUserName').value
    var password = document.getElementById('loginPassword').value
    for (let i = 0; i < user.length; i++) {
        if (username == user[i].username && password == user[i].password) {
            console.log(username + " is logged in!!!");
            loginForm.classList.add("form_hidden");
            currentUser.push(user[i]);
            console.log("current user:" + currentUser);
            createAccountForm.classList.add("form_hidden");
            document.getElementById('container').style.display = "none";
            localStorage.setItem("currentID", JSON.stringify(currentUser));
            JSON.parse(localStorage.getItem('currentID'));
            return location.href = '../html/addTask.html';

        } else {
            console.log("username or password is wrong");
            changeColor();
        }

    }
}




function changeColor() {
    console.log("change color");
    document.getElementById('loginUserName').style.color = "red";
    document.getElementById('loginPassword').style.color = "red";
    document.getElementById('error').innerHTML = "password and username is wrong."

}


function regristerUsers() {
    var regristerusername = document.getElementById('signupUsername').value;
    var regristeremail = document.getElementById('userEmail').value;
    var regristerpassword = document.getElementById('signUpPassword').value;
    var regristerpassword2 = document.getElementById('signUpPassword2').value;
    var newUser = {
        username: regristerusername,
        email: regristeremail,
        password: regristerpassword
    }
    for (let i = 0; i < user.length; i++) {
        if (regristerusername == user[i].username) {
            alert("that username is already in use, please choose another.");
            return;
        } else if (regristerpassword.length < 5) {
            document.getElementById('signUpPassword').style.color = "red";
            document.getElementById('signUpPassword2').style.color = "red";
            document.getElementById('error_password').innerHTML = "that password is too short,include 5 or more characters.";
            return;
        } else if (regristeremail == user[i].email) {
            alert("that email is already in use, please choose another.");
            return;
        } else if (regristerpassword == user[i].password) {
            alert("that password is already in use, please choose another.");
            return;
        } else if (regristerpassword != regristerpassword2) {
            alert("the password is not the same as the repeated password");
            return;
        }
    }
    user.push(newUser);
    console.log(user);
    loginForm.classList.remove("form_hidden");
    createAccountForm.classList.add("form_hidden");
}

function loginAsGuest() {
    loginForm.classList.add("form_hidden");
    createAccountForm.classList.add("form_hidden");
    document.getElementById('container').style.display = "none";
}
