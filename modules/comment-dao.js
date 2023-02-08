const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Create comment, and insert into comments table in DB
async function createComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into comments (content, user_id, article_id, parent_comment_id)  values (${comment.content}, ${comment.user_id}, ${comment.article_id}, ${comment.parent_comment_id})`);
}

// Select the first layer comments by article id, and retrieve data from comments table in DB
async function getCommentsById(article_id) {
    const db = await dbPromise;
    const commentsArray = await db.all(SQL`
        select * from comments where article_id = ${article_id}`);

    return commentsArray;
}

// Select the deeper layer comments by parent comment id, and retrieve data from comments table in DB
async function getCommentsByParentId(parent_comment_id) {
    const db = await dbPromise;
    const commentsArray = await db.all(SQL`
        select * from comments where parent_comment_id = ${parent_comment_id}`);

    return commentsArray;
}


module.exports = {
    createComment,
    getCommentsById,
    getCommentsByParentId
};