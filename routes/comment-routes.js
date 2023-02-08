const express = require("express");
const router = express.Router();

const commentDb = require("../modules/comment-dao.js");

router.post("/add-comment", async function (req, res) {
    const user = res.locals.user;

    const comment = {
        content: req.body.comment,
        parent_comment_id: null,
        user_id: user.user_id,
        username: user.username,
        article_id: req.body.articleId
    };
    
    await commentDb.createComment(comment);

    res.redirect("back");
});

// route handler for the second layer comments
router.post("/add-2nd-comment", async function (req, res) {
    const user = res.locals.user;

    const comment = {
        content: req.body.secondComment,
        parent_comment_id: req.body.parent_comment_id,
        user_id: user.user_id
    };
    
    await commentDb.createCommentTwo(comment);

    res.redirect("back");
});

// route handler for the third layer comments
router.post("/add-3rd-comment", async function (req, res) {
    const user = res.locals.user;

    const comment = {
        content: req.body.thridComment,
        parent_comment_id: req.body.parent_comment_id,
        user_id: user.user_id
    };
    
    await commentDb.createCommentThree(comment);

    res.redirect("back");
});

module.exports = router; 