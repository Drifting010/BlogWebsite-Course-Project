DROP TABLE IF EXISTS likedarticles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id INTEGER primary key not null,
    username VARCHAR(20) unique,
    pass VARCHAR(100),
	authtoken VARCHAR(100),
    avatar_id VARCHAR(30),
    first_name VARCHAR(10),
    last_name VARCHAR(10),
    date_of_birth DATE,
    description TEXT
);

CREATE TABLE articles (
    article_id INTEGER not null primary key,
    title VARCHAR(255), 
    created_datetime TIMESTAMP default CURRENT_TIMESTAMP,
    content TEXT, 
    image VARCHAR(255), 
    user_id INTEGER,
    username VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE comments (
    comment_id INTEGER not null primary key, 
    content TEXT,
    created_datetime TIMESTAMP default CURRENT_TIMESTAMP,
    downvote INTEGER,
    parent_comment_id INTEGER,
    user_id INTEGER,
    username VARCHAR(20),
    article_id INTEGER,
    FOREIGN KEY (parent_comment_id) REFERENCES comments (comment_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
);

CREATE TABLE likedarticles (
    user_id INTEGER,
    article_id INTEGER,
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
);
