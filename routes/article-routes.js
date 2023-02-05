const express = require("express");
const router = express.Router();

const articleDb = require("../modules/article-dao.js");
const user = res.locals.user;

const articleId; 

router.get("/articles-all", async function (req, res) {
    const articlesAll = await articleDb.getArticles;
    res.locals.articles = articlesAll;
    res.render("all-articles");
});

router.post("/articles-all-sort", async function (req, res) {
    const articlesAll = await articleDb.getArticles;
    const order = res.body.order;

    await articleDb.sortArticles(articlesAll, order);

    res.locals.articles = articles;
    res.render("all-articles");
});

router.get("/articles-user", async function (req, res) {
    const articlesUser = await articleDb.getArticlesByUser(user);

    res.locals.articles = articlesUser;
    res.render("user-articles");
});

router.post("/articles-user", async function (req, res) {
    const articlesUser = await articleDb.getArticlesByUser(user);
    const order = res.body.order;

    await articleDb.sortArticles(articlesUser, order);
    
    res.locals.articles = articlesUser;
    res.render("user-articles");
});

// router.post("/publish", upload.single("coverPhoto"), async function (req, res) {
    router.post("/publish-article", function (req, res) {
    const article = {
        title: req.body.title,
        content: req.body.content,
        // image: req.file,
        user_id: user.user_id
    };
    articleDb.createArticle(article);

    res.render("user-articles");
});




module.exports = router; 