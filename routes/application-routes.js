const express = require("express");
const router = express.Router();

// const testDao = require("../modules/test-dao.js");

const { verifyAuthenticated } = require("../middleware/auth-middleware.js"); // import middleware from auth-middleware.js

router.get("/", verifyAuthenticated, async function (req, res) {

    res.render("home");
});



module.exports = router;