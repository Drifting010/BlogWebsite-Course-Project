if (window.location.href === "http://localhost:3000/newaccount") {
    window.addEventListener("DOMContentLoaded", function (event) {
        let value = true; // record the result of usernamecheck() function as it only returns Promise object

        // hint display
        const usernameCheckDiv = this.document.querySelector("#usernamecheck");
        const pwdCheckDiv = document.querySelector("#pwdcheck");

        // Elements from HTML
        const username = document.querySelector("#txtUsername");
        const pwdOne = document.querySelector("#txtPassword");
        const pwdTwo = document.querySelector("#txtPasswordConfirm");
        const form = document.querySelector("#formNewAccount");
        
        // Listen to specified elements
        username.addEventListener("input", usernameCheck);
        pwdTwo.addEventListener("input", pwdCheck);
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
                value = true;
            } else {
                usernameCheckDiv.innerText = "Username Already Taken!";
                value = false;
            }
        }
        
        // Function for password match check
        function pwdCheck() {
            if (pwdOne.value == '' || pwdTwo.value == '') {
                pwdCheckDiv.innerText = "";
                return false;
            } else if (pwdOne.value != '' && pwdOne.value == pwdTwo.value) {
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
}  


   
if (window.location.href === "http://localhost:3000/updateaccount") {
    document.addEventListener("DOMContentLoaded", function() {
        let value1 = true;
        let value2 = true;
    
        // hint display
        const updateUsernameCheckDiv = document.querySelector("#updateUsernameCheck");
        const updatePwdCheckDiv = document.querySelector("#updatePwdCheck");
    
        // Elements from HTML
        const updatedUsername = document.querySelector("#updatedTxtUsername");
        const updatedPasswordOne = document.querySelector("#updatedTxtPassword");
        const updatedPasswordTwo = document.querySelector("#updateTxtPasswordConfirm");
        const updateForm = document.querySelector("#formUpdateAccount");
        const updateSubmitBtn = document.querySelector("#update-submit-button");
        
        // Listen to specified elements
        updatedUsername.addEventListener("input", updatedUsernameCheck);
        updatedPasswordTwo.addEventListener("input", updatedPwdCheck);
        
        updateForm.addEventListener("submit", function (e) {
            const result = updateFormSubmitCheck();
    
            
            if (!result) {
                e.preventDefault(); // stop form to submit
            }
        });
        
        // Function for username check
        async function updatedUsernameCheck() {
            const response = await fetch("./usenamecheck");
            const userJson = await response.json(); // an array of json objects
            let flag = true;
    
            for (let i = 0; i < userJson.length; i++) {
                if (userJson[i].username === updatedUsername.value) {
                    flag = false;
                    break;
                }
            }
            
            if (flag) {
                updateUsernameCheckDiv.innerText = "Username Check Passes!";
                // updateSubmitBtn.removeAttribute("disabled", "");
                value1 = true;
            } else {
                updateUsernameCheckDiv.innerText = "Username Already Taken!";
                // updateSubmitBtn.setAttribute("disabled", "");
                value1 = false;
            }
        }
        
        // Function for password match check
        function updatedPwdCheck() {
            if (updatedPasswordOne.value == '' || updatedPasswordTwo.value == '') {
                updatePwdCheckDiv.innerText = "";
                // updateSubmitBtn.setAttribute("disabled", "");
                value2 = false;
            } else if (updatedPasswordOne.value != '' && updatedPasswordOne.value == updatedPasswordTwo.value) {
                updatePwdCheckDiv.innerText = "Password Matches!";
                // updateSubmitBtn.removeAttribute("disabled", "");
                value2 = true;
            } else {
                updatePwdCheckDiv.innerText = "Password Must Match!";
                // updateSubmitBtn.setAttribute("disabled", "");
                value2 = false;
            }
        }
        
        // Function for form submit check
        function updateFormSubmitCheck() {
            if (updatedUsername.value !== '' || updatedPasswordOne.value !== '' || updatedPasswordTwo.value !== '') {
                return value1 && value2;
            }
        }
    
    
        // Switch statement for checking avatar registered 
        const catAvatar = document.querySelector(".catAvatar");
        const dogAvatar = document.querySelector(".dogAvatar");
        const foxAvatar = document.querySelector(".foxAvatar");
        const gorillaAvatar = document.querySelector(".gorillaAvatar");
        const koalaAvatar = document.querySelector(".koalaAvatar");
        const rabbitAvatar = document.querySelector(".rabbitAvatar");
        const tigerAvatar = document.querySelector(".tigerAvatar");
        const currentAvatar = document.querySelector(".currentAvatar");
        
        switch (currentAvatar.value) {
            case "cat":
                catAvatar.checked = true;
                break;
                case "dog":
                dogAvatar.checked = true;
                break;
            case "fox":
                foxAvatar.checked = true;
                break;
            case "gorilla":
                gorillaAvatar.checked = true;
                break;
                case "koala":
                koalaAvatar.checked = true;
                break;
            case "rabbit":
                rabbitAvatar.checked = true;
                break;
            case "tiger":
                tigerAvatar.checked = true;
                break;
        }

        
        // Set value of user's password
        const currentPassword = document.querySelector(".currentPassword");
        
        updateSubmitBtn.addEventListener("click", function() {
            if (updatedPasswordOne.value === '' && updatedPasswordTwo.value == '') {
                    updatedPasswordOne.value = currentPassword.value;
            }
        });
    });
}