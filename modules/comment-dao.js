const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into comments (content, user_id, article_id)  values (${comment.content}, ${comment.user_id}, ${comment.article_id});`);
}

async function getComments() {
    const db = await dbPromise;
    const commentsArray = await db.all(SQL`
    select * from comments`);

    return commentsArray;
}


module.exports = {
    createComment,
    getComments
};