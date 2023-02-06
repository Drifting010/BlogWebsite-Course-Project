const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function getArticles() {
    const db = await dbPromise;
    const articleArray = await db.all(SQL`
    select * from articles`)

    return articleArray;
}

async function getArticlesByUser(user) {
    const db = await dbPromise;
    const userArticleArray = await db.all(SQL`
    select * from articles
    where user_id = ${user.user_id}`)

    return userArticleArray;
}

async function getArticleById(id) {
    const db = await dbPromise;
    const article = await db.get(SQL`
    select * from articles
    where article_id = ${id}`)
    
    return article;
}

/**
 * delete an article by its id
 */
async function deleteArticleById(id) {
    const db = await dbPromise;
    await db.run(SQL`
        delete from articles where article_id=${id}`);
}

async function createArticle(article) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into articles (title, content, user_id, username)  values (${article.title},${article.content}, ${article.user_id}, ${article.username});`);
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
 * retrieve articles ordered by its username from Database
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
 * retrieve articles ordered by its date from Database
 */
async function articlesByDateDesc(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by created_datetime desc`);

    return articles;
}
async function articlesByDateAsc(){
    const db = await dbPromise;
    const articles = await db.all(SQL`select * from articles order by created_datetime`);

    return articles;
}

// USER ARTICLES SORTING
/**
 * retrieve articles ordered by its title from Database
 */
async function userArticlesByTitleZa(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by title desc`);

    return articles;
}

async function userArticlesByTitleAz(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by title`);

    return articles;
}


/**
 * retrieve articles ordered by its username from Database
 */
async function userArticlesByUsernameZa(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by username desc;`);

    return articles;
}
async function userArticlesByUsernameAz(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by username`);

    return articles;
}

/**
 * retrieve articles ordered by its date from Database
 */
async function userArticlesByDateDesc(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by created_datetime desc`);

    return articles;
}
async function userArticlesByDateAsc(user){
    const db = await dbPromise;
    const articles = await db.all(SQL`
        select * from articles where user_id=${user.user_id} order by created_datetime`);

    return articles;
}

module.exports = {
    getArticles,
    getArticlesByUser,
    createArticle,
    getArticleById,
    articlesByTitleZa,
    articlesByTitleAz,
    articlesByUsernameZa,
    articlesByUsernameAz,
    articlesByDateDesc,
    articlesByDateAsc,
    userArticlesByTitleZa,
    userArticlesByTitleAz,
    userArticlesByUsernameZa,
    userArticlesByUsernameAz,
    userArticlesByDateDesc,
    userArticlesByDateAsc
};