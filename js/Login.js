const loginForm = document.getElementById("login");
const createAccountForm = document.querySelector("#regrister");

let currentUser = [];
let user = [
  {
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
  document.getElementById("error").innerHTML = "password or username is wrong.";
}

function regristerUsers() {
  var regristerusername = document.getElementById("signupUsername").value;
  var regristeremail = document.getElementById("userEmail").value;
  var regristerpassword = document.getElementById("signUpPassword").value;
  var regristerpassword2 = document.getElementById("signUpPassword2").value;
  var newUser = {
    username: regristerusername,
    email: regristeremail,
    password: regristerpassword,
  };
  for (let i = 0; i < user.length; i++) {
    if (regristerusername == user[i].username) {
      alert("that username is already in use, please choose another.");
      return;
    } else if (regristerpassword.length < 5) {
      document.getElementById("signUpPassword").style.color = "red";
      document.getElementById("signUpPassword2").style.color = "red";
      document.getElementById("error_password").innerHTML = "that password is too short,include 5 or more characters.";
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

async function loginAsGuest() {
  await backend.setItem("currentUser", JSON.stringify(5));
  return (location.href = "../html/addTask.html");
}
