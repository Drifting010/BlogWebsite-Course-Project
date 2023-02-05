const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function retrieveCommentsByArticleId(article_id) {
    const db = await dbPromise;

    const comments = await db.all(SQL`
        select * from comments where article_id=${article_id}`);

    return comments;
}

module.exports = {
    retrieveCommentsByArticleId
};