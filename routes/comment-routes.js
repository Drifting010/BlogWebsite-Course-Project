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
    console.log("Triggered");
    const comment_id = req.query.comment_id;
    console.log(comment_id);
    const commentsArray = await commentDb.getCommentsByParentId(comment_id);
    console.log(commentsArray);
    res.json(commentsArray);
});

// // route handler for the third layer comments
// router.get("/add-3rd-comment", async function (req, res) {
//     const user = res.locals.user;

//     const comment = {
//         content: req.body.thridComment,
//         parent_comment_id: req.body.parent_comment_id,
//         user_id: user.user_id
//     };

//     await commentDb.createCommentThree(comment);

//     res.redirect("back");
// });

module.exports = router; 