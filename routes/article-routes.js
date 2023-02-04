const express = require("express");
const router = express.Router();
const articleDb = require("../modules/article-dao.js");

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
    const articlesUser = await articleDb.getArticlesByUser;

    res.locals.articles = articlesUser;
    res.render("user-articles");
});

router.post("/articles-user", async function (req, res) {
    const articlesUser = await articleDb.getArticlesByUser;
    const order = res.body.order;

    await articleDb.sortArticles(articlesUser, order);
    
    res.locals.articles = articlesUser;
    res.render("user-articles");
});



module.exports = router; 