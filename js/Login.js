function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message_success", "form_message_error");
    messageElement.classList.add(`form_message_${type}`);

}

function clearInputError(inputElement) {
    inputElement.classList.remove("form_input_error");
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector("orm_input_error_message").textContent = "error."
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#createAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form_hidden");
        createAccountForm.classList.remove("form_hidden");
    });

    document.querySelector("#linklogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form_hidden");
        createAccountForm.classList.add("form_hidden");
    });
    loginForm.addEventListener("sumbit", e => {
        e.preventDefault();
        setFormMessage(loginForm, "error", "Ungültiger Benutzername oder das Passwort ist falsch.")
    });

    document.querySelectorAll(".form_input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "der Benutzername darf nicht länger als 10 Zeichen sein!");
            }

        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});