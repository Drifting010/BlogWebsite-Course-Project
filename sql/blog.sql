-- @Author: Hikaru Suzuki
-- @Created: 31/01/2023
-- @Modified: dd/mm/yyyy


-- To drop tables if exists

-- TEST
drop table if exists test;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS liked-articles;


-- To create the tables (DDL)

-- TEST
create table test (
    id integer not null primary key,
    stuff text  
);

CREATE TABLE users (
    Username VARCHAR(255) not null primary key,
    Password NVARCHAR(100), 
    Hashed_Password NVARCHAR(100),
    Salted_password NVARCHAR(100),
    Avatar_number INTEGER,
    First_Name VARCHAR(255),
    Last_Name VARCHAR(255),
    Date_Of_Birth DATE,
    Description TEXT
);

CREATE TABLE articles (
    Article_Id INTEGER not null primary key, 
    Title VARCHAR(255), 
    Content TEXT, 
    Image VARCHAR(255), 
    FOREIGN KEY (Username) REFERENCES users (Username),
);

CREATE TABLE comments (
    Comment_Id INTEGER not null primary key, 
    Content TEXT,
    Created_DateTime TIMESTAMP,
    Upvote INTEGER,
    Downvote INTEGER,
    FOREIGN KEY (Parent_Comment_Id) REFERENCES comments (Comment_Id),
    FOREIGN KEY (Username) REFERENCES users (Username),
    FOREIGN KEY (Article_Id) REFERENCES articles (Article_Id)
);

CREATE TABLE liked-articles (
    FOREIGN KEY (Username) REFERENCES users (Username),
    FOREIGN KEY (Article_Id) REFERENCES articles (Article_Id)
);


-- Queries

-- TEST
insert into test (stuff) values
    ('Things'),
    ('More things');

INSERT INTO users (Username, Password, Avatar_number, First_Name, Last_Name, Date_Of_Birth, Description) VALUES
    ('user123', 'password123', 1, 'Myfirstname', 'Mylastname', '01-01-2000', "User's name is Myfirstname Mylastname. The user name is user123.");

INSERT INTO articles (Article_Id, Title, Text, Image) VALUES
    (1, 'Hello!', 'Hello evryone, this is my first blog!', 'image.png');

INSERT INTO comments (Comment_Id, Text, Created_DateTime, Upvote, Downvote) VALUES
    (1, 'Brilliant!', '2023-01-01 00:00:00:00', 1, 1);

