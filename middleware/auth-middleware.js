
const userDb = require("../modules/user-dao.js")

async function addUserToLocals(req, res, next) { // display user info in handlebar
    const authToken = req.cookies.authToken; // get cookie storing the authToken
    const user = await userDb.retrieveUserWithAuthToken(authToken); // get the user
    res.locals.user = user; // pass the user to home.handlebars to render
    next();
}

function verifyAuthenticated(req,res,next){ // user authentication
    if(res.locals.user){ // if user found (i.e. authenticated), go to corresponding route handler
        next();
    } else{
        res.redirect("/articles-all");
    }
}

module.exports = {
    addUserToLocals,
    verifyAuthenticated
};