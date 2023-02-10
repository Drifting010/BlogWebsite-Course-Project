const express = require("express");
const router = express.Router();

const articleDb = require("../modules/article-dao.js");
const commentDb = require("../modules/comment-dao.js");
const upload = require("../middleware/multer-uploader.js");
const fs = require("fs");

router.get("/articles-all", async function (req, res) {
    const articlesAll = await articleDb.getArticles();
    res.locals.articles = articlesAll;

    const commentsAll = await commentDb.getCommentsById();
    res.locals.comments = commentsAll;

    res.render("all-articles");
});


router.get("/articles-user", async function (req, res) {
    const user = res.locals.user;
    const articlesUser = await articleDb.getArticlesByUser(user);

    res.locals.articles = articlesUser;
    res.locals.user = user;
    res.render("user-articles");
});

router.post("/publish-article", upload.single("imageFile"), async function (req, res) {
    const user = res.locals.user;
    const fileInfo = req.file;

    const oldFileName = fileInfo.path;
    const newFileName = `./public/uploadedFiles/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    const article = {
        title: req.body.title,
        content: req.body.content,
        image: fileInfo.originalname,
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

// EDIT ARTICLE
router.post("/article-edit", async function (req, res) {
    const article_id = req.body.article_id;
    const article = await articleDb.getArticleById(article_id);

    res.locals.article = article;
    res.render("edit-article");
});

router.post("/publish-changes", upload.single("imageFile"), async function (req, res) {
    const user = res.locals.user;
    let article;

    if (req.file) {
        const fileInfo = req.file;

        const oldFileName = fileInfo.path;
        const newFileName = `./public/uploadedFiles/${fileInfo.originalname}`;
        fs.renameSync(oldFileName, newFileName);

        article = {
            title: req.body.title,
            content: req.body.content,
            image: fileInfo.originalname,
            user_id: user.user_id,
            username: user.username,
            article_id: req.body.article_id
        };
        articleDb.updateArticleWithImage(article);
    } else {
        article = {
            title: req.body.title,
            content: req.body.content,
            user_id: user.user_id,
            username: user.username,
            article_id: req.body.article_id
        };
        articleDb.updateArticleWithoutImage(article);
    }

    res.redirect(`/article/${article.article_id}`);

});

// DELETE ARTICLE
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


router.get("/article/:article_id", async function (req, res) {
    const article = await articleDb.getArticleById(req.params.article_id);
    const comments = await commentDb.getCommentsById(req.params.article_id);
    
    res.locals.article = article;
    res.locals.comments = comments;
    res.render("single-article");
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

router.get("/likeStatus", async function (req, res) {
    const article_id = req.query.id;
    const user = res.locals.user;
    const user_id = user.user_id;
    let likeStatus = await articleDb.checkLike(article_id, user_id);

    if(!likeStatus) {
        await articleDb.likeArticle(article_id, user_id);
    } else {
        await articleDb.unlikeArticle(article_id, user_id);
    }

    let newLikeStatus = await articleDb.checkLike(article_id, user_id);

    if (newLikeStatus === undefined) {
        newLikeStatus = {};
    }
    console.log(newLikeStatus)
    res.json(newLikeStatus);

});


router.get("/likeStatusOnLoad", async function (req, res) {
    const article_id = req.query.id;
    const user = res.locals.user;
    const user_id = user.user_id;
    let likeStatus = await articleDb.checkLike(article_id, user_id);

    if(!likeStatus) {
        likeStatus = {};
    }

    res.json(likeStatus);
   
});


module.exports = router; 