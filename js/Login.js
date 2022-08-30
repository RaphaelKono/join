const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#regrister");





function sumbit() {

    loginForm.classList.remove("form_hidden");
    createAccountForm.classList.add("form_hidden");
}

function createAcc() {

    loginForm.classList.add("form_hidden");
    createAccountForm.classList.remove("form_hidden");
}
