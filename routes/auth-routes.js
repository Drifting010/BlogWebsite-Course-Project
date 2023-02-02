// Express Router
const express = require("express");
const router = express.Router();

// Authentication
const { v4: uuid } = require("uuid");

// Module
const userDb = require("../modules/user-db.js");

// router for login page display
router.get("/login", function (req, res) {
    if(res.locals.user){
        res.redirect("/")
    } else {
        res.render("login"); // ???NEED A login.handlebars file
    }
});

// router for "./login" data submission
router.get("/login", async function (req, res) {
    const username = req.query.name; // ???INPUT TAG IN HTML FORM MUST SET ITS NAME ATTRIBUTE TO name
    const password = req.query.password; // ???SAME AS ABOVE

    const user = userDb.getUserWithCredentials(username, password); // get user from database

    if(user) { // user exists
        const authToken = uuid(); // generate authToken
        user.authToken = authToken; // attach this authToken to user
        res.cookie("authToken", authToken); // save this authentication to a cookie
        res.locals.user = user; // pass data to handlebar with user variable

        res.redirect("/"); // ???Authentication passes: GO TO PERSONALISED HOME PAGE
    } else { // undefined
        const message = "Authentication Failed!"
        res.setToastMessage(message); // create a cookie containing message as value; this is a function from toaster-middleware.js
        res.redirect("/login"); // Authentication fails: go to login page
    }
});

router.get("/logout", function (req, res) {
    res.clearCookie("authToken"); // Delete cookie storing the authToken of this session

    // WHERE TO PUT THE TOAST MESSAGE???
    res.setToastMessage("Successfully logged out!"); // store toast message in a new cookie
    res.redirect("./login");
});

module.exports = router; // export all the routers in order to import them in the main application