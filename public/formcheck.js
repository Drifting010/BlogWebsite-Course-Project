window.addEventListener("load", function (event) {

    // hint display
    const usernameChecckDiv = this.document.querySelector("#usernamecheck");
    const pwdCheckDiv = document.querySelector("#pwdcheck");

    const username = document.querySelector("#txtUsername");
    const pwdOne = this.document.querySelector("#txtPassword");
    const pwdTwo = this.document.querySelector("#txtPasswordConfirm");

    username.addEventListener("blur", usernameCheck);
    pwdTwo.addEventListener("blur", pwdCheck);


    async function usernameCheck() {
        const reponse = await fetch("./usenamecheck");
        const userJson = await reponse.json();

        userJson.array.forEach(element => {
            if(element.username === username.value) {
                usernameChecckDiv.innerText = "Username Check Passes!";
                return true;
            } else {
                usernameChecckDiv.innerText = "Username Already Taken!";
            }
        });

        return false;
    }

    function pwdCheck() {
        if (pwdOne.value != '' && pwdOne.value == pwdTwo.value) {
            pwdCheckDiv.innerText = "Password Matches!";
            return true;
        } else {
            pwdCheckDiv.innerText = "Password Must Match!";
            return false;
        }
    }

});