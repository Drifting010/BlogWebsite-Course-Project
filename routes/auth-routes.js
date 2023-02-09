// Express Router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); 

// Authentication
const { v4: uuid } = require("uuid");

// Module
const userDb = require("../modules/user-dao.js");


router.get("/login", function (req, res) {
        res.render("login");
});


router.post("/login", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await userDb.retrieveUserWithCredentials(username); 
    
    if (user) {
        const isValid = await bcrypt.compare(password, user.pass);

        if (isValid) {
            const authToken = uuid(); 
            user.authToken = authToken; 
            await userDb.updateUserToken(user);
            res.cookie("authToken", authToken); 
            res.locals.user = user; 
    
            res.redirect("/"); 
            
            // TODO Authentication passes: GO TO PERSONALISED HOME PAGE

        } else { 
            // TODO add useful error message
            
            res.locals.user = null;
            res.setToastMessage("Authentication Failed!"); 
            res.redirect("/login"); 
        }
    } else {
        // TODO add useful error message

        res.locals.user = null;
        res.setToastMessage("Authentication Failed!"); 
        res.redirect("/login"); 
    }
    
});


router.get("/logout", function (req, res) {
    res.clearCookie("authToken"); 
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!"); 
    res.redirect("/articles-all");
});


router.get("/newAccount", function (req, res) {
    res.render("new-account");
});


router.post("/newAccount", async function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        avatar_id: req.body.avatar,
        first_name: req.body.firstName,
        last_name: req.body.lastname,
        date_of_birth: req.body.dob,
        description: req.body.description,
    };

    try { 
        await userDb.createUser(user);
        res.setToastMessage("Account created successfully!"); 
        res.redirect("/login"); 
    } catch (err) { 
        res.setToastMessage("username is already taken!");
        res.redirect("/newAccount"); 
    }
});


router.get("/updateAccount", function (req, res) {
    res.render("update-account");
});

router.post("/updateaccount", async function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password,
        avatar_id: req.body.avatar,
        first_name: req.body.firstName,
        last_name: req.body.lastname,
        date_of_birth: req.body.dob,
        description: req.body.description,
    };

    await userDb.updateUserDetails(user);

    res.redirect("/"); 
});


router.get("/usenamecheck", async function (req, res) {
    const users = await userDb.retrieveAllUsers();
    res.json(users);
});


router.get("/deleteaccount", async function (req, res) {

    try {
        await userDb.deleteUser(res.locals.user.user_id,);
        res.clearCookie(authToken);
        res.setToastMessage("Account is deleted");
        res.redirect("/");
    } catch (error) {
        res.setToastMessage("Something went wrong!");
        res.redirect("/"); 
    }

    //TODO add useful message to confirm account deletion for user
});


module.exports = router; // export all the routers in order to import them in the main application