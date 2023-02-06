const express = require("express");
const router = express.Router();

const commentDb = require("../modules/comment-dao.js");

router.post("/add-comment", async function (req, res) {
    const user = res.locals.user;

    const comment = {
        content: req.body.comment,
        user_id: user.user_id,
        article_id: req.body.articleId
    };
    
    commentDb.createComment(comment);

    res.redirect("/articles-all");
});

module.exports = router; 