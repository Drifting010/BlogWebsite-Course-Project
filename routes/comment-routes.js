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

    await commentDb.createComment(comment);

    res.redirect("back");
});

// route handler for the second layer comments
router.post("/add-2nd-comment", async function (req, res) {
    const user = res.locals.user;
    // console.log(user);
    const comment = {
        content: req.body.secondComment,
        parent_comment_id: req.body.parent_comment_id,
        user_id: user.user_id
    };
    // console.log(comment);

    await commentDb.createComment(comment);

    res.redirect("back");
});

// route handler for rendering all comments of one article
router.get("/comments-all", async function (req, res) {
    const comment_id = req.query.comment_id;
    const commentsArray = await commentDb.getCommentsByParentId(comment_id);

    res.json(commentsArray);
});


router.get("/comments-delete", async function (req, res) {
    const idOne = req.query.id; // comment_id; layer one comment
    const commentsArrayTwo = await commentDb.getCommentsByParentId(idOne);

    for (let i = 0; i < commentsArrayTwo.length; i++) { // layer two
        let idTwo = commentsArrayTwo[i].comment_id; 
        await commentDb.deleteCommentsByParentId(idTwo); // delete layer three
    }

    await commentDb.deleteCommentsByParentId(idOne); // delete layer two
    await commentDb.deleteCommentById(idOne); // delete layer one

    res.redirect("back"); // direct back to the original page
});

module.exports = router; 