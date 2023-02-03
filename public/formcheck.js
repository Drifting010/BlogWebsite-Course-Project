
window.addEventListener("load", function (event) {

    let value = true; // record the result of usernamecheck() function as it only returns Promise object

    // hint display
    const usernameChecckDiv = this.document.querySelector("#usernamecheck");
    const pwdCheckDiv = document.querySelector("#pwdcheck");

    // Elements from HTML
    const username = document.querySelector("#txtUsername");
    const pwdOne = this.document.querySelector("#txtPassword");
    const pwdTwo = this.document.querySelector("#txtPasswordConfirm");
    const form = this.document.querySelector("#formNewAccount");

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
        const reponse = await fetch("./usenamecheck");
        const userJson = await reponse.json(); // an array of json objects
        let flag = true;

        for (let i = 0; i < userJson.length; i++) {
            if (userJson[i].username === username.value) {
                flag = false;
                break;
            }
        }

        if (flag) {
            usernameChecckDiv.innerText = "Username Check Passes!";
            value = true;
        } else {
            usernameChecckDiv.innerText = "Username Already Taken!";
            value = false;
        }
    }

    // Function for password match check
    function pwdCheck() {
        if (pwdOne.value != '' && pwdOne.value == pwdTwo.value) {
            pwdCheckDiv.innerText = "Password Matches!";
            return true;
        } else {
            pwdCheckDiv.innerText = "Password Must Match!";
            return false;
        }
    }

    // Function for form submit check
    function formSubmitCheck() {
        return value && pwdCheck();
    }
});