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
DROP TABLE IF EXISTS sessions;
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
errorcode BOOLEAN DEFAULT false,
views INTEGER DEFAULT 0,
tags TEXT,
last_active DATE DEFAULT NOW()
);

-- DO I NEED THE SPARATE TAGS

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
comment_score INTEGER DEFAULT 0
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

-- CREATE TABLE translation (
-- input VARCHAR(50) UNIQUE,
-- correction VARCHAR(50)
-- );

CREATE TABLE searchhistory (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
language TEXT NOT NULL,
search TEXT NOT NULL,
resultpost INTEGER,
searchdate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

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

-- INSERT INTO translation
-- (input, correction)
-- VALUES
-- ('js', 'javascript'),
-- ('node.js', 'node'),
-- ('react.js', 'react'),

INSERT INTO posts (userid, post_title, post, tags)
VALUES
( 1, 'how do I concatenate', 'trying to figure out this query situation', 'psql sql middleware node'),
( 1, 'how do I write a function', 'this function keeps crashing when I try to reference it', 'javascript function reference'),
( 1, 'typeerror keeps happening', 'i keep getting this error and it''s a typeerror', 'error typeerror'),
( 1, 'touble with css', 'I can''t get my div to move over', 'css'),
( 1, 'React error', 'this import doesnt seem to want to work', 'React import'),
( 1, 'node wont run', 'I get an error when I try to do this in node', 'middleware node'),
( 1, 'psql question', 'my select is pulling the wrong data', 'psql sql query'),
( 1, 'what am i doing wrong', 'trying to figure out this javascript situation', 'psql sql middleware node');

INSERT INTO comments (userid, postid, comment)
VALUES
(1, 1, 'You forgot to add a comma'),
(1, 1, 'Did you try this?'),
(1, 2, 'You need to do this but not before your return statement'),
(1, 3, 'You didn''t inculde a return statement');






