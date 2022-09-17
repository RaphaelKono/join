const loginForm = document.getElementById("login");
const createAccountForm = document.querySelector("#regrister");
let selectedNewUser = "userNew-1";
let currentUser = [];
let regrist = false;

async function initLogin() {
    setURL("https://gruppe-302.developerakademie.net/smallest_backend_ever");
    await downloadFromServer();
    await getUsersFromServer();
}

function sumbit() {
    loginForm.classList.remove("form_hidden");
    createAccountForm.classList.add("form_hidden");
}

function createAcc() {
    loginForm.classList.add("form_hidden");
    createAccountForm.classList.remove("form_hidden");
}

async function login() {
    var username = document.getElementById("loginUserName").value;
    var password = document.getElementById("loginPassword").value;
    for (let i = 0; i < backendUsers.length; i++) {
        if (username == backendUsers[i].userName && password == backendUsers[i].password) {
            await backend.setItem("currentUser", JSON.stringify(backendUsers[i].id));
            return (location.href = "../html/addTask.html");
        }
    }
    changeColor();
}

function changeColor() {
    document.getElementById("loginUserName").style.color = "red";
    document.getElementById("loginPassword").style.color = "red";
    document.getElementById("loginUserName").style.borderColor = "red"
    document.getElementById("loginPassword").style.borderColor = "red"
    document.getElementById("error").innerHTML = "password or username is wrong.";
}

async function regristerUsers() {
    var regristerusername = document.getElementById("signupUsername").value;
    var regristerfirstname = document.getElementById("signupfirstname").value;
    var regristerlastname = document.getElementById("signuplastname").value;
    var regristeremail = document.getElementById("userEmail").value;
    var regristerpassword = document.getElementById("signUpPassword").value;
    var regristerpassword2 = document.getElementById("signUpPassword2").value;
    var regristerimg = '../img/' + document.getElementById(selectedNewUser).src.split('/img/')[1];
    var newUser = {
        id: (backendUsers.length + 1),
        userName: regristerusername,
        password: regristerpassword,
        firstName: regristerfirstname,
        lastName: regristerlastname,
        email: regristeremail,
        src: regristerimg,
    };
  
   for (let i = 0; i < backendUsers.length; i++) {
        if (regristerusername == backendUsers[i].userName) {
            document.getElementById("error_password").innerHTML = "that username is already in use, please choose another.";
            document.getElementById("signupUsername").style.borderColor = "red"
            return;
        } else if (regristerpassword.length < 5) {
            document.getElementById("error_password").innerHTML = "that password is too short,include 5 or more characters.";
            document.getElementById("error_password").style.color = "red";
            return;
        } else if (regristeremail == backendUsers[i].email) {
            document.getElementById("error_password").innerHTML = "that email is already in use, please choose another.";
            document.getElementById("userEmail").style.borderColor = "red"

            return;
        } else if (regristerpassword == backendUsers[i].password) {
            document.getElementById("error_password").innerHTML = "that password is already in use, please choose another.";
            document.getElementById("loginPassword").style.borderColor = "red"
            return;
        } else if (regristerpassword != regristerpassword2) {
            document.getElementById("error_password").innerHTML = "the password is not the same as the repeated password";
            document.getElementById("loginPassword2").style.borderColor = "red"
            return;
        }
        if (regristerusername == "" || regristerfirstname == "" || regristerlastname == "" || regristeremail == "" || regristerpassword == "" || regristerpassword2 == "") {
            document.getElementById("error_password").innerHTML = "please fill all flieds.";
            return;
        }
    }

    regrist = true;
    if (regrist = true) {
        alert('Your register was succesful!');
        await backendUsers.push(newUser);
        await backend.setItem("users", JSON.stringify(backendUsers));
        await backend.setItem("currentUser", JSON.stringify(newUser.id));
        location.href = "../html/addTask.html";
    }

}

function selectNewUser(i) {
    let user = document.getElementById("userNew-" + i);
    if (i != 1) user.classList.toggle("avatar-selected");
    if (selectedNewUser.includes("userNew-" + i)) {
        selectedNewUser = "userNew-1";
        document.getElementById("userNew-1").classList.add("avatar-selected");
    } else {
        selectedNewUser = "userNew-" + i;
        if (i == 1) {
            document.getElementById("userNew-1").classList.add("avatar-selected");
        }
        for (let j = 1; j < 4; j++) {
            if (j == i) continue;
            document.getElementById("userNew-" + j).classList.remove("avatar-selected");
        }
    }
}

async function loginAsGuest() {
    await backend.setItem("currentUser", JSON.stringify(5));
    return (location.href = "../html/addTask.html");
}
