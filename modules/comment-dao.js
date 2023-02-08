const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`
    insert into comments (content, username, user_id, article_id, parent_comment_id)  values (${comment.content}, ${comment.username}, ${comment.user_id}, ${comment.article_id}, ${comment.parent_comment_id});`);
}

async function getCommentsById(id) {
    const db = await dbPromise;
    const commentsArray = await db.all(SQL`
    select * from comments where article_id = ${id}`);

    return commentsArray;
}


module.exports = {
    createComment,
    getCommentsById
};