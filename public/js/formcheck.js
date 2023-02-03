window.addEventListener("load", function (event) {

    // hint display
    const username = document.querySelector("#usernamecheck");
    const pwdCheckDisplay = document.querySelector("#pwdcheck");

    // 
    const pwdOne = this.document.querySelector("#txtPassword");
    const pwdTwo = this.document.querySelector("#txtPasswordConfirm");

    pwdCheckDisplay.addEventListener("blur", pwdCheck);

    function pwdCheck() {
        if (pwdOne != '' && pwdOne == pwdTwo) {
            pwdCheckDisplay.innerText = "Password Matches!";
            return true;
        } else {
            pwdCheckDisplay.innerText = "Password Must Match!";
            return false;
        }
    }





});