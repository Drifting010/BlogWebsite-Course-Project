window.addEventListener("load", function (event) {

    // hint display
    const username = document.querySelector("#usernamecheck");

    const pwdCheckDiv = document.querySelector("#pwdcheck");

    // 
    const pwdOne = this.document.querySelector("#txtPassword");
    const pwdTwo = this.document.querySelector("#txtPasswordConfirm");

    pwdTwo.addEventListener("keydown", pwdCheck);

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