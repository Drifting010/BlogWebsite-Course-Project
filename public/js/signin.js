const form = document.getElementById('form');
const username = document.getElementById('username');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const avatar = document.getElementById('avatar');
const dateOfBirth = document.getElementById('dateOfBirth');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
let errors = 0;

form.addEventListener('submit', function() {
    /**
     * This function check if submit button clicked on not
     * If it is clicked, checkUsername() function is called.
     * 
     */        
    function checkSubmitButton() {
        // To assign each value a user input to the appropriate variable 
        const usernameValue = username.value.trim();
        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const avatarValue = avatar.value.trim();
        const dateOfBirthValue = dateOfBirth.value.trim();
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();
        
        // To check each form value. 
        if (usernameValue === "" &&
        firstNameValue == "" &&
        lastNameValue == "" &&
        avatarValue == "" &&
        dateOfBirthValue == "" &&
        passwordValue == "" &&
        confirmPasswordValue == "") {
            // If empty, redirect
            // window.location.href = "signin.html";
            console.log("header");
        } else {
            // If fill out, call checkUsername() function.
            connectToDatabase();
            console.log("header");
        }
    }
    
    /**
     * This function to call connectDb() function from "/modules/database.js"connect to the database.
     * If a server does not connect with the database, then throw an error.
     * If connect to it successfully, call checkUserName() function.
     * 
     */
    const connectDb = require('../modules/database');
    connectDb();
    function connectToDatabase() {
        connectDb.connect(function(error) {
            if (error) {
                throw error;
            } else {
                console.log("Connected to the database successfully!");
            }
        });
    } 
    checkUsername();

    /**
     * This function check user's name if it already exists.
     *
     */
    const query = `SELECT User_Name FROM users LIKE ${username}`;
    const error1 = document.getElementById('error1');

    function checkUsername() {
        connectDb.query(query, function (result) {
            if (error) {
                throw error;
            } else if (username === result) {
                error1.innerHTML = "This username is already taken!";
            }
        });
    } 
    checkPasswordLengthAndChar();


    /**
     * This function check the length and character of user's password.
     *
     */
    const error2 = document.getElementById('error2');
    const regularExpression = /^[a-zA-Z0-9.?\/-]{8,100}$/;
    function checkPasswordLengthAndChar() {
        if (password.length < 8) {
            error2.innerHTML += "Password must be at least 8 characters!<br>";
            errors++;
        } else if (regularExpression.test(password)) {
            error2.innerHTML += "Password is included unexpected characters!<br>";
            errors++;
        }
    }
    checkMatchedPassword();


    /**
     * This function check user's passwords if both passwords user input correspond precisely.
     *
     */
    function checkMatchedPassword() {
        if (password !== confirmPassword) {
            error2.innerHTML += "Passwords do not match!<br>";
            errors++;
        }
    }
    moveToLoginPage();
    

    /**
     * This function is to move on to "login.html" page if no errors.
     *
     */
    function moveToLoginPage() {
        if (errors === 0) {
            window.location.href = "login.html";
        }
    }

    checkSubmitButton();
});