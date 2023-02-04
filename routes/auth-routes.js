// Express Router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // hashing and salting password

// Authentication
const { v4: uuid } = require("uuid");

// Module
const userDb = require("../modules/user-dao.js");

// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {
    if (res.locals.user) {
        res.redirect("/")
    } else {
        res.render("login");

        // TODO render articles page even if when not logged in
    }
});

// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/". Otherwise, redirect to "/login", with a "login failed" message.
router.post("/login", async function (req, res) {
    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;
    
    // Find a matching user in the database
    const user = await userDb.retrieveUserWithCredentials(username); // get user from database
    
    if (user) {
        const isValid = await bcrypt.compare(password, user.pass);

        if (isValid) {
            const authToken = uuid(); // generate authToken
            user.authToken = authToken; // attach this authToken to user
            await userDb.updateUserToken(user); // update user's authToken for every login
            res.cookie("authToken", authToken); // save this authentication to a cookie
            res.locals.user = user; // pass data to handlebar with user variable
    
            res.redirect("/"); // TODO Authentication passes: GO TO PERSONALISED HOME PAGE
        } else { 
            // TODO add useful error message
            // const errorMessage = "Incorrect password, please try again.";
            // res.locals.errorMessage = errorMessage;

            res.locals.user = null;
            res.setToastMessage("Authentication Failed!"); // create a cookie containing message as value; this is a function from toaster-middleware.js
            res.redirect("/login"); // Authentication fails: go to login page
        }
    } else {
        // TODO add useful error message
        const errorMessage = "User does not exist. Please check your username or create an account."
        res.locals.errorMessage = errorMessage;

        res.locals.user = null;
        res.setToastMessage("Authentication Failed!"); // create a cookie containing message as value; this is a function from toaster-middleware.js
        res.redirect("/login"); // Authentication fails: go to login page
    }
    
});

// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.clearCookie("authToken"); // Delete cookie storing the authToken of this session
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!"); // store toast message in a new cookie
    res.redirect("/login");
});

// Whenver we navigate to /newAccount, just render the new-account html page
router.get("/newAccount", function (req, res) {

    res.render("new-account");
});

// Whenver we POST to /newAccount, insert new user info into database
router.post("/newAccount", async function (req, res) {
    // JSON object for data storage
    const user = {
        username: req.body.username,
        password: req.body.password,
        authtoken: req.cookies.authToken,
        avatar_id: req.body.avatar,
        first_name: req.body.firstName,
        last_name: req.body.lastname,
        date_of_birth: req.body.dob,
        description: req.body.description
    };

    try { // if username is unique
        // insert new user info into database
        await userDb.createUser(user);
        // rediret to /login 
        res.setToastMessage("Account created successfully!"); // include toast message in a new cookie
        res.redirect("/login"); // redirect to login page
    } catch (err) { // if unique constraint in SQL failed

        // NEED TO CHANGE THE CODE BELOW AFTER IMPLEMENTTING HOW TO CHECK USERNAME AT THE FRONT
        res.setToastMessage("username is already taken!");
        res.redirect("/newAccount"); // redirect to account creation page
    }
});


router.get("/updateAccount", function (req, res) {
    res.render("update-account");
});

router.post("/updateaccount", async function (req, res) {
    // JSON object for data storage
    const user = {
        username: req.body.username,
        password: req.body.password,
        authtoken: req.cookies.authToken,
        avatar_id: req.body.avatar,
        first_name: req.body.firstName,
        last_name: req.body.lastname,
        date_of_birth: req.body.dob,
        description: req.body.description
    };
    userDb.updateUserDetails(user);

    res.render("home");
});


// router for usernamecheck, retrieve all users from DB and sent back to client-side
router.get("/usenamecheck", async function (req, res) {
    const users = await userDb.retrieveAllUsers();
    res.json(users);
});


router.get("/deleteaccount", async function (req, res) {
    const authToken = req.cookies.authToken;
    const user = await userDb.retrieveUserWithAuthToken(authToken);
    console.log(user);

    try {
        await userDb.deleteUser(user.username);
        res.clearCookie(authToken);
        res.setToastMessage("Account is completely deleted");
        res.redirect("/");
    } catch (error) {
        res.setToastMessage("Something went wrong!");
        res.redirect("/"); 
    }
});



module.exports = router; // export all the routers in order to import them in the main application