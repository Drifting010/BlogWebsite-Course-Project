const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getArticles() {
    const articleArray = await db.all(SQL`
    select * from articles`)

    return articleArray;
}

async function getArticlesByUser(user) {
    const userArticleArray = await db.all(SQL`
    select * from articles
    where user_id = ${user.id}`)
    
    return userArticleArray;
}

async function getArticlesById(id) {
    const article = await db.all(SQL`
    select * from articles
    where article_id = ${id}`)
    
    return article;
}

async function sortArticles(articles, order) {
    
    
    if (order = "oldest-first") {
        articles.sort((a, b) => {
            if (a.article_id < b.article_id) {
                return -1;
            }
        })
    } 
    
    if (order = "newest-first") {
        articles.sort((a, b) => {
            if (a.article_id > b.article_id) {
                return 1;
            }
        })
    } 
    
    if (order = "title-a-z") {
        articles.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
        })
    } 
    
    if (order = "title-z-a") {
              articles.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
        })
    }

    if (order = "user-a-z") {
        articles.sort((a, b) => {
            if (a.user_id < b.user_id) {
                return -1;
            }
        })
    }

    if (order = "user-z-a") {
        articles.sort((a, b) => {
            if (a.user_id > b.user_id) {
                return 1;
            }
        })
    }
}

async function createArticle(article) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into articles (title, content, user_id)  values (${article.title},${article.content}, ${article.user_id});`);
}

// ALL ARTICLES SORTING
/**
 * retrieve articles ordered by its title from Database
 */
async function articlesByTitleZa(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by title desc`);

    return articles;
}

async function articlesByTitleAz(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by title`);

    return articles;
}


/**
 * retrieve articles ordered by its title from Database
 */
async function articlesByUsernameZa(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by username desc`);

    return articles;
}
async function articlesByUsernameAz(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by username`);

    return articles;
}

/**
 * retrieve articles ordered by its title from Database
 */
async function articlesByDateDesc(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by date desc`);

    return articles;
}
async function articlesByDateAsc(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by date`);

    return articles;
}

module.exports = {
    getArticles,
    getArticlesByUser,
    sortArticles,
    createArticle,
    getArticlesById,
    articlesByTitleZa,
    articlesByTitleAz,
    articlesByUsernameZa,
    articlesByUsernameAz,
    articlesByDateDesc,
    articlesByDateAsc
};