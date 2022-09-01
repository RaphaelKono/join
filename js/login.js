const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#regrister");

var user = [{
        username: "user1",
        password: "123456"
    },
    {
        username: "user2",
        password: "123456"
    },
    {
        username: "user3",
        password: "123456"
    },
    {
        username: "user4",
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
            console.log(username + " is logged in!!!")
            
            return
        } else {
            console.log("username or password is wrong")
        }
    }
}
