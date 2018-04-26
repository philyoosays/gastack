DROP DATABASE gastackoverflow;
CREATE DATABASE gastackoverflow;

\c gastackoverflow

DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posttags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS programs;
-- WHAT DOES CASCADE DO?

CREATE TABLE programs (
id SERIAL PRIMARY KEY,
program TEXT NOT NULL
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
fname TEXT DEFAULT '',
lname TEXT DEFAULT '',
email VARCHAR(40) UNIQUE NOT NULL,
username VARCHAR(25) UNIQUE NOT NULL,
password_digest TEXT NOT NULL,
programid INTEGER REFERENCES programs(id),
language TEXT DEFAULT 'english',
avatar TEXT,
blurb VARCHAR(255),
location VARCHAR(255),
website VARCHAR(255),
github VARCHAR(255),
account_type TEXT,
active BOOLEAN DEFAULT true,
date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
post_title TEXT NOT NULL,
post TEXT UNIQUE NOT NULL,
date_created TIMESTAMP NOT NULL DEFAULT NOW(),
date_edited TIMESTAMP DEFAULT NOW(),
post_score INTEGER DEFAULT 0,
views INTEGER DEFAULT 0,
last_active DATE DEFAULT NOW(),
postvector tsvector NOT NULL
);

CREATE TABLE tags (
id SERIAL PRIMARY KEY,
tags TEXT NOT NULL
);

CREATE TABLE post_tags (
postid INTEGER REFERENCES posts(id),
tagid INTEGER REFERENCES tags(id)
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id),
comment TEXT NOT NULL,
date_created TIMESTAMP NOT NULL DEFAULT NOW(),
comment_score INTEGER DEFAULT 0,
commentvector tsvector NOT NULL
);

CREATE TABLE favorites (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id)
);

CREATE TABLE resources (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
label VARCHAR(255) NOT NULL,
link VARCHAR(255) NOT NULL
);

CREATE TABLE stopwords (
stopword VARCHAR(50) UNIQUE
);

CREATE TABLE searchhistory (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
language TEXT NOT NULL,
search TEXT NOT NULL,
resultpost INTEGER REFERENCES posts(id)
);

INSERT INTO programs
(program)
VALUES
('Android Development'),
('Digital Marketing'),
('Data Analytics'),
('Data Science'),
('Front-End Web Development'),
('iOS Development'),
('Javascript Development'),
('Product Management'),
('Software Engineering'),
('User Experience Design'),
('Visual Design'),
('Web Development');
-- abcdefghijklmnopqrstuvwxyz

INSERT INTO stopwords
(stopword)
VALUES
('the'),
('how'),
('do'),
('i'),
('when'),
('use'),
('what'),
('can'),
('him'),
('her');






