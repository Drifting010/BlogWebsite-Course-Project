const express = require("express");
const router = express.Router();

const testDao = require("../modules/test-dao.js");

const { verifyAuthenticated } = require("../middleware/auth-middleware.js"); // import middleware from auth-middleware.js

router.get("/", verifyAuthenticated, async function (req, res) {

    res.locals.title = "My route title!";
    res.locals.allTestData = await testDao.retrieveAllTestData();

    res.render("home");
});

router.get("/login", function (req, res){
    res.render("login");
})

router.get("/new-account", function (req, res){


    res.render("new-account");
})

module.exports = router;