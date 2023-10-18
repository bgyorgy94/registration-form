const body = document.querySelector("body");
const formData = document.querySelector("form");
const registerBtn = document.querySelector(".registerbtn");
const nameContainer = document.querySelector("#name-container");
const emailContainer = document.querySelector("#email-container");
const emailConfirmContainer = document.querySelector("#email-confirm-container");
const learntContainer = document.querySelector("#learnt-container");
const checkboxContainer = document.querySelector("#checkbox-container");

registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    resetWarnings();
    const isValid = formValidation(formData);
    if (isValid) {
        sendForm();
    };
});

function sendForm() {
    body.innerHTML = `<div class="confirmation">
                        <h1>Registration successful!</h1>
                      </div>`
}

function formValidation(form) {
    const checkName = checkValue(form.name, nameContainer, "Name field is required!");
    const checkEmail = checkValue(form.email, emailContainer, "Email field is required!");
    const checkStatement = isChecked(form.statement, checkboxContainer, "This field must be checked!");
    const checkConfirm = checkConfirmedEmail(form.email, form.emailConfirm, emailConfirmContainer, "The email addresses do not match!");

    if (checkName && checkEmail && checkStatement && checkConfirm) {
        return true;
    } else {
        return false;
    };
};

function checkValue(field, container, warningMsg) {
    if (!field.value) {
        field.classList.add("red-outline");
        writeWarning(container, warningMsg);
        return false;
    } else {
        return true;
    };
};

function isChecked(checkbox, container, warningMsg) {
    if (!checkbox.checked) {
        writeWarning(container, warningMsg);
        return false;
    } else {
        return true;
    };
};

function checkConfirmedEmail(email1, email2, container, warningMsg) {
    if (email1.value !== email2.value) {
        email2.classList.add("red-outline");
        writeWarning(container, warningMsg);
        return false;
    } else {
        return true;
    };
};

function writeWarning(container, warningMsg) {
    const warning = document.createElement("p");
    warning.classList.add("warning-msg");
    warning.innerHTML = warningMsg;
    container.append(warning);
};

function resetWarnings() {
    const containers = document.querySelectorAll("form > div");
    containers.forEach((container) => {
        const warning = container.querySelector(".warning-msg");
        if (warning !== null) {
            warning.remove();
            container.querySelector("input").classList.remove("red-outline");
        }
    });
};