const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Create comment for the first layer, and insert into comments table in DB
async function createComment(comment) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into comments (content, username, user_id, article_id, parent_comment_id)  values (${comment.content}, ${comment.username}, ${comment.user_id}, ${comment.article_id}, ${comment.parent_comment_id})`);
}

// Create comment for the second layer, and insert into commentstwo table in DB
async function createCommentTwo(comment) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into commentstwo (content,  user_id, parent_comment_id)  values (${comment.content}, ${comment.user_id}, ${comment.parent_comment_id});`);
}

// Create comment for the third layer, and insert into commentsthree table in DB
async function createCommentThree(comment) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into commentsthree (content,  user_id, parent_comment_id)  values (${comment.content}, ${comment.user_id}, ${comment.parent_comment_id});`);
}

// Select the first layer comments by article id, and retrieve data from comments table in DB
async function getCommentsById(id) {
    const db = await dbPromise;
    const commentsArray = await db.all(SQL`
        select * from comments where article_id = ${id}`);

    return commentsArray;
}

// Select the second layer comments by parent comment id, and retrieve data from commentstwo table in DB
async function getCommentsTwoById(id) {
    const db = await dbPromise;
    const commentsTwoArray = await db.all(SQL`
        select * from commentstwo where parent_comment_id = ${id}`);

    return commentsTwoArray;
}

// Select the third layer comments by parent comment id, and retrieve data from commentsthree table in DB
async function getCommentsThreeById(id) {
    const db = await dbPromise;
    const commentsThreeArray = await db.all(SQL`
        select * from commentsthree where parent_comment_id = ${id}`);

    return commentsThreeArray;
}

module.exports = {
    createComment,
    createCommentTwo,
    createCommentThree,
    getCommentsById,
    getCommentsTwoById,
    getCommentsThreeById
};