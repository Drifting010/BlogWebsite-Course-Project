const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");


async function retrieveAllArticles() {
    const db = await dbPromise;

    const articles = await db.all(SQL`select * from articles`);
    return articles;
}

module.exports = {
    retrieveAllArticles
};