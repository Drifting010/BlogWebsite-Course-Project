const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const db = await dbPromise;

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

module.exports = {
    getArticles,
    getArticlesByUser,
    sortArticles
};