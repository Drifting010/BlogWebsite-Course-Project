// Express Router
const express = require("express");
const router = express.Router();

// Authentication
const { v4: uuid } = require("uuid");

// Module
const userDb = require("../modules/user-dao.js");

// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {
    if(res.locals.user){
        res.redirect("/")
    } else {
        res.render("login"); 
    }
});

// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/". Otherwise, redirect to "/login", with a "login failed" message.
router.post("/login", async function (req, res) {
    // Get the username and password submitted in the form
    const username = req.query.name; 
    const password = req.query.password; 

    // Find a matching user in the database
    const user = await userDb.getUserWithCredentials(username, password); // get user from database

    if(user) { // user exists
        const authToken = uuid(); // generate authToken
        user.authToken = authToken; // attach this authToken to user
        res.cookie("authToken", authToken); // save this authentication to a cookie
        res.locals.user = user; // pass data to handlebar with user variable

        res.redirect("/"); // ???Authentication passes: GO TO PERSONALISED HOME PAGE
    } else { // undefined
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
        hashed_password: req.body.hashed_password,
        salt: req.body.salt,
        avatar_id: req.body.avatar_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        description: req.body.description
    };

    try { // if username is unique
        // insert new user info into database
        await userDao.createUser(user);
        // rediret to /login 
        res.setToastMessage("Account created successfully!"); // include toast message in a new cookie
        res.redirect("/login"); // redirect to login page
    } catch (err) { // if unique constraint in SQL failed
        
        // NEED TO CHANGE THE CODE BELOW AFTER IMPLEMENTTING HOW TO CHECK USERNAME AT THE FRONT
        res.setToastMessage("username is already taken!");
        res.redirect("/newAccount"); // redirect to account creation page
    }
});

module.exports = router; // export all the routers in order to import them in the main application