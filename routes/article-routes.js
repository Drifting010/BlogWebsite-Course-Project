const express = require("express");
const router = express.Router();

const articleDb = require("../modules/article-dao.js");


router.get("/articles-all", async function (req, res) {
    const articlesAll = await articleDb.getArticles;
    res.locals.articles = articlesAll;
    res.render("all-articles");
});


router.get("/articles-user", async function (req, res) {
    const user = res.locals.user;
    const articlesUser = await articleDb.getArticlesByUser(user);

    res.locals.articles = articlesUser;
    res.render("user-articles");
});

// router.post("/publish", upload.single("coverPhoto"), async function (req, res) {
router.post("/publish-article", function (req, res) {
    const user = res.locals.user;
    const article = {
        title: req.body.title,
        content: req.body.content,
        // image: req.file,
        user_id: user.user_id
    };
    articleDb.createArticle(article);

    res.render("user-articles");
});


router.get("/articlesSortByTitle", function (req, res) {
    const articles = articleDb.retrieveArticlesByTitle();

    res.locals.articles = articles;
});

router.get("/articlesSortByUsername", function (req, res) {
    const articles = articleDb.retrieveArticlesByUsername();

    res.locals.articles = articles;
});

// default rendering
router.get("/articlesSortByDate", function (req, res) {
    const articles = articleDb.retrieveArticlesByDate();

    res.locals.articles = articles;
});

// title: a-z  z-a
// default: desc by Date
// 

module.exports = router; 