window.addEventListener("load", function (event) {

    let value = true; // record the result of usernamecheck() function as it only returns Promise object

    // hint display
    const usernameCheckDiv = this.document.querySelector("#usernamecheck");
    const pwdCheckDiv = document.querySelector("#pwdcheck");

    // Elements from HTML
    const username = document.querySelector("#txtUsername");
    const pwdOne = document.querySelector("#txtPassword");
    const pwdTwo = document.querySelector("#txtPasswordConfirm");
    const form = document.querySelector("#formNewAccount");
    const submitBtn = document.querySelector("#submit-button")

    // Listen to specified elements
    username.addEventListener("blur", usernameCheck);
    pwdTwo.addEventListener("blur", pwdCheck);
    form.addEventListener("submit", function (e) {
        const result = formSubmitCheck();

        if (!result) {
            e.preventDefault(); // stop form to submit
        }
    });

    // Function for username check
    async function usernameCheck() {
        const response = await fetch("./usenamecheck");
        const userJson = await response.json(); // an array of json objects
        let flag = true;

        for (let i = 0; i < userJson.length; i++) {
            if (userJson[i].username === username.value) {
                flag = false;
                break;
            }
        }

        if (flag) {
            usernameCheckDiv.innerText = "Username Check Passes!";
            submitBtn.removeAttribute("disabled", "");
            value = true;
        } else {
            usernameCheckDiv.innerText = "Username Already Taken!";
            submitBtn.setAttribute("disabled", "");
            value = false;
        }
    }

    // Function for password match check
    function pwdCheck() {
        if (pwdOne.value != '' && pwdOne.value == pwdTwo.value) {
            pwdCheckDiv.innerText = "Password Matches!";
            submitBtn.removeAttribute("disabled", "");
            return true;
        } else {
            pwdCheckDiv.innerText = "Password Must Match!";
            submitBtn.setAttribute("disabled", "");
            return false;
        }
    }

    // Function for form submit check
    function formSubmitCheck() {
        if (value == true && pwdCheck() == true) {
            submitBtn.removeAttribute("disabled", "");
        }
        return value && pwdCheck();
    }

});