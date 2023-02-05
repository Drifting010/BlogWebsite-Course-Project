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

// ALL ARTICLES SORTING
router.get("/articles-all/title-az", function (req, res) {
    const articles = articleDb.articlesByTitleAz();

    res.locals.articles = articles;
});

router.get("/articles-all/title-za", function (req, res) {
    const articles = articleDb.articlesByTitleZa();

    res.locals.articles = articles;
});

router.get("/articles-all/username-az", function (req, res) {
    const articles = articleDb.articlesByUsernameAz();

    res.locals.articles = articles;
});

router.get("/articles-all/username-za", function (req, res) {
    const articles = articleDb.articlesByUsernameZa();

    res.locals.articles = articles;
});

// default rendering
router.get("/articles-all/date-desc", function (req, res) {
    const articles = articleDb.articlesByDateDesc();

    res.locals.articles = articles;
});

router.get("/articles-all/date-asc", function (req, res) {
    const articles = articleDb.articlesByDateAsc();

    res.locals.articles = articles;
});


// USER ARTICLES SORTING



// title: a-z  z-a
// default: desc by Date
// date: asc & desc
// username: asc & desc

module.exports = router; 