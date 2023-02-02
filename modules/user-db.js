const users = [ // test data, which needs to be changed after build connection with database
    {
        id: 0,
        username: "user1",
        password: "pa55word",
        name: "Alice"
    },
    {
        id: 1,
        username: "user2",
        password: "pa55word",
        name: "Bob"
    }
];

function getUserWithCredentials(username, password) {
    return users.find(function(user) {
        return user.username === username && user.password === password;
    });
}

function getUserWithAuthToken(authToken) {
    if (!authToken) {
        return undefined;
    }
    return users.find(function(user) {
        return user.authToken === authToken;
    });
}

module.exports = {
    getUserWithCredentials,
    getUserWithAuthToken
};
