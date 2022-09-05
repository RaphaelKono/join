const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#regrister");
var currentUser = [];


var user = [{
        username: "user1",
        profilpic: "img",
        email: "testmail@mail.com",
        password: "123456"
    },
    {
        username: "user2",
        profilpic: "img",
        email: "testmail2@mail.com",
        password: "123456"
    },
    {
        username: "user3",
        profilpic: "img",
        email: "testmail3@mail.com",
        password: "123456"
    },
    {
        username: "user4",
        profilpic: "img",
        email: "testmail4@mail.com",
        password: "123456"
    },
]



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
            currentUser.push(user[i].username);
            console.log("current user:" + currentUser);
            createAccountForm.classList.add("form_hidden");
            document.getElementById('container').style.display = "none";
            return
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
        } else if (regristerpassword.length < 6) {
            document.getElementById('signUpPassword').style.color = "red";
            document.getElementById('signUpPassword2').style.color = "red";
            document.getElementById('error_password').innerHTML = "that password is too short,include 6 or more characters.";
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
