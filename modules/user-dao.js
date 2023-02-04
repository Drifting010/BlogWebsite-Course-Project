const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");
const bcrypt = require('bcrypt'); 

/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 */
async function createUser(user) {
    const db = await dbPromise;
    
    const hash = await bcrypt.hash(user.password, 10);

    await db.run(SQL`
        insert into users (username, pass, authtoken, avatar_id, first_name, last_name, date_of_birth,description) values(${user.username}, ${hash}, ${user.authtoken}, ${user.avatar_id}, ${user.first_name}, ${user.last_name}, ${user.date_of_birth}, ${user.description})`);
}

/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} id the id of the user to get.
 */
async function retrieveUserByUsername(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

    return user;
}

/**
 * Gets the user with the given username and hashed_password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} hashed_password the user's hashed_password
 */
async function retrieveUserWithCredentials(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

    return user;
}

/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the user's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where authToken = ${authToken}`);

    return user;
}

/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */
async function updateUserToken(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, authToken = ${user.authToken}
        where username = ${user.username}`);

}

async function updateUserDetails(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, 
        avatar_id = ${user.avatar_id},
        first_name = ${user.first_name},
        last_name = ${user.last_name},
        date_of_birth = ${user.date_of_birth},
        description = ${user.description}
        where authtoken = ${user.authtoken}`);
}


/**
 * Deletes the user with the given id from the database.
 * 
 * @param {number} id the user's id
 */
async function deleteUser(username) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from users
        where username = ${username}`);
}

// Export functions.
module.exports = {
    createUser,
    retrieveUserByUsername,
    retrieveUserWithCredentials,
    retrieveUserWithAuthToken,
    retrieveAllUsers,
    updateUserToken,
    deleteUser,
    updateUserDetails
};
