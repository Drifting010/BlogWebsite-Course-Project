const express = require("express");
const router = express.Router();

const articleDb = require("../modules/article-dao.js");
const commentDb = require("../modules/comment-dao.js");


router.get("/articles-all", async function (req, res) {
    const articlesAll = await articleDb.getArticles();
    res.locals.articles = articlesAll;

    const commentsAll = await commentDb.getComments();
    res.locals.comments = commentsAll;
    console.log(commentsAll);

    res.render("all-articles");
});


router.get("/articles-user", async function (req, res) {
    const user = res.locals.user;
    const articlesUser = await articleDb.getArticlesByUser(user);

    res.locals.articles = articlesUser;
    res.render("user-articles");
});

// router.post("/publish", upload.single("coverPhoto"), async function (req, res) {
router.post("/publish-article", async function (req, res) {
    const user = res.locals.user;
    const article = {
        title: req.body.title,
        content: req.body.content,
        // image: req.file,
        user_id: user.user_id,
        username: user.username
    };
    articleDb.createArticle(article);

    const articles = await articleDb.getArticlesByUser(user);

    res.locals.articles = articles;
    res.redirect("/articles-user");
});

router.get("/create-article", function (req, res) {
    res.render("create-article");
});

// EDIT ARTICLEs
router.post("/article-edit", async function (req, res) {
    const article_id = req.body.article_id;
    const article = await articleDb.getArticleById(article_id);
    // console.log(article);
    // TODO: populate article in WYSIWYG editor

});

// DELETE ARTICLEs
router.post("/article-delete", async function (req, res) {
    const article_id = req.body.article_id;
    await articleDb.deleteArticleById(article_id);

    res.redirect("./articles-user");
});

// ALL ARTICLES SORTING
router.get("/articles-all-title-az", async function (req, res) {
    const articles = await articleDb.articlesByTitleAz();

    res.locals.articles = articles;
    res.render("all-articles");
});

router.get("/articles-all-title-za", async function (req, res) {
    const articles = await articleDb.articlesByTitleZa();

    res.locals.articles = articles;
    res.render("all-articles");
});

router.get("/articles-all-username-az", async function (req, res) {
    const articles = await articleDb.articlesByUsernameAz();

    res.locals.articles = articles;
    res.render("all-articles");
});

router.get("/articles-all-username-za", async function (req, res) {
    const articles = await articleDb.articlesByUsernameZa();

    res.locals.articles = articles;
    res.render("all-articles");
});

// default rendering
router.get("/articles-all-date-desc", async function (req, res) {
    const articles = await articleDb.articlesByDateDesc();

    res.locals.articles = articles;
    res.render("all-articles");
});

router.get("/articles-all-date-asc", async function (req, res) {
    const articles = await articleDb.articlesByDateAsc();

    res.locals.articles = articles;
    res.render("all-articles");
});

// USER ARTICLES SORTING
router.get("/articles-user-title-az", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByTitleAz(user);

    res.locals.articles = articles;
    res.render("user-articles");
});

router.get("/articles-user-title-za", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByTitleZa(user);

    res.locals.articles = articles;
    res.render("user-articles");
});

router.get("/articles-user-username-az", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByUsernameAz(user);

    res.locals.articles = articles;
    res.render("user-articles");
});

router.get("/articles-user-username-za", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByUsernameZa(user);

    res.locals.articles = articles;
    res.render("user-articles");
});

router.get("/articles-user-date-desc", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByDateDesc(user);

    res.locals.articles = articles;
    res.render("user-articles");
});

router.get("/articles-user-date-asc", async function (req, res) {
    const user = res.locals.user;
    const articles = await articleDb.userArticlesByDateAsc(user);

    res.locals.articles = articles;
    res.render("user-articles");
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