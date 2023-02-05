// Express Router
const express = require("express");
const router = express.Router();

// Authentication
const { v4: uuid } = require("uuid");

// Module
const articleDb = require("../modules/article-dao-test.js");
const commentDb = require("../modules/comment-dao-test.js");

// 
// 
router.get("/articles", async function (req, res) {
    const articles = makeArray(await articleDb.retrieveAllArticles());
    let commentsSet = [];

    // articles.forEach(async article => {

    // });

    for (let i = 0; i < articles.length; i++) {
        const comments = await commentDb.retrieveCommentsByArticleId(articles[i].article_id);
        commentsSet[i] = comments; // double array
    }
    // console.log(commentsSet);

    res.locals.articles = articles;
    res.locals.commentsSet = commentsSet;

    res.render("test-articleWithComment");
});

function makeArray(input) {
    if (input === undefined) {
        return [];
    } else if (Array.isArray(input)) {
        return input;
    } else {
        return [input];
    }
}


module.exports = router;