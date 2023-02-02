-- @Author: Hikaru Suzuki
-- @Created: 31/01/2023
-- @Modified: dd/mm/yyyy


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likedarticles;


-- To create the tables (DDL)


CREATE TABLE users (
    username VARCHAR(20) not null primary key,
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
    content TEXT, 
    image VARCHAR(255), 
    username VARCHAR(20),
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE comments (
    comment_id INTEGER not null primary key, 
    content TEXT,
    created_datetime TIMESTAMP,
    upvote INTEGER,
    downvote INTEGER,
    parent_comment_id INTEGER,
    username VARCHAR(20),
    article_id INTEGER,
    FOREIGN KEY (parent_comment_id) REFERENCES comments (comment_id),
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
);

CREATE TABLE likedarticles (
    username VARCHAR(30),
    article_id INTEGER,
    PRIMARY KEY (username, article_id),
    FOREIGN KEY (username) REFERENCES users (username),
    FOREIGN KEY (article_id) REFERENCES articles (article_id)
);
