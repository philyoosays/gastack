-- DROP DATABASE gastackoverflow;
-- CREATE DATABASE gastackoverflow;

-- \c gastackoverflow

DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS post_tags CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS allowedusers CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS commentvotes CASCADE;
DROP TABLE IF EXISTS searchhistory CASCADE;
DROP TABLE IF EXISTS postviews CASCADE;

CREATE TABLE messages (
id SERIAL PRIMARY KEY,
message TEXT NOT NULL
);

CREATE TABLE programs (
id SERIAL PRIMARY KEY,
program TEXT NOT NULL,
programshort TEXT NOT NULL
);

CREATE TABLE cohort (
id SERIAL PRIMARY KEY,
programid INTEGER REFERENCES programs(id),
cohort TEXT NOT NULL
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
fname TEXT DEFAULT '',
lname TEXT DEFAULT '',
email VARCHAR(40) UNIQUE NOT NULL,
username VARCHAR(25) UNIQUE NOT NULL,
password_digest TEXT NOT NULL,
programid INTEGER REFERENCES programs(id),
cohortid INTEGER REFERENCES cohort(id),
language TEXT DEFAULT 'english',
avatar TEXT,
blurb VARCHAR(255),
location VARCHAR(255),
website VARCHAR(255),
github VARCHAR(255),
account_type TEXT DEFAULT '',
active BOOLEAN DEFAULT true,
date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE allowedusers (
id SERIAL PRIMARY KEY,
email VARCHAR(40) UNIQUE NOT NULL,
addedby INTEGER REFERENCES users(id)
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
post_title TEXT NOT NULL,
post TEXT UNIQUE NOT NULL,
posthtml TEXT NOT NULL,
date_created TIMESTAMP NOT NULL DEFAULT NOW(),
date_edited TIMESTAMP DEFAULT NOW(),
post_score INTEGER DEFAULT 0,
errorcode BOOLEAN DEFAULT false,
tags TEXT,
last_active DATE DEFAULT NOW(),
isdeleted BOOLEAN DEFAULT false
);

-- DO I NEED THE SEPARATE TAGS

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
commenthtml TEXT NOT NULL,
date_created TIMESTAMP NOT NULL DEFAULT NOW(),
date_edited TIMESTAMP DEFAULT NOW(),
comment_score INTEGER DEFAULT 0,
isdeleted BOOLEAN DEFAULT false
);

CREATE TABLE commentvotes (
id SERIAL PRIMARY KEY,
commentid INTEGER REFERENCES comments(id),
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id),
vote INTEGER DEFAULT 0,
date_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE favorites (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id)
);

CREATE TABLE resources (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
label TEXT NOT NULL,
labelhtml TEXT,
link VARCHAR(255) NOT NULL,
date_created TIMESTAMP DEFAULT NOW()
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

CREATE TABLE views (
id SERIAL PRIMARY KEY,
postid INTEGER REFERENCES posts(id),
userid INTEGER REFERENCES users(id),
date_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

INSERT INTO programs
(program, programshort)
VALUES
('Data Science', 'DS'),
('Front-End Web Development', 'Front-End WebDev'),
('Javascript Development', 'JS Dev'),
('Web Development Immersive', 'WDI'),
('Web Development Part-time', 'WD-PT');

INSERT INTO cohort
(programid, cohort)
VALUES
(4, 'Ewoks'),
(4, 'Rover Opportunity'),
(4, 'Rover Spirit'),
(4, 'Tesseract');

-- abcdefghijklmnopqrstuvwxyz

-- INSERT INTO translation
-- (input, correction)
-- VALUES
-- ('js', 'javascript'),
-- ('node.js', 'node'),
-- ('react.js', 'react'),

-- INSERT INTO posts (userid, post_title, post, tags)
-- VALUES
-- ( 1, 'how do I concatenate', 'trying to figure out this query situation', 'psql sql middleware node'),
-- ( 1, 'how do I write a function', 'this function keeps crashing when I try to reference it', 'javascript function reference'),
-- ( 1, 'typeerror keeps happening', 'i keep getting this error and it''s a typeerror', 'error typeerror'),
-- ( 1, 'touble with css', 'I can''t get my div to move over', 'css'),
-- ( 1, 'React error', 'this import doesnt seem to want to work', 'React import'),
-- ( 1, 'node wont run', 'I get an error when I try to do this in node', 'middleware node'),
-- ( 1, 'psql question', 'my select is pulling the wrong data', 'psql sql query'),
-- ( 1, 'what am i doing wrong', 'trying to figure out this javascript situation', 'psql sql middleware node');

-- INSERT INTO comments (userid, postid, comment)
-- VALUES
-- (1, 1, 'You forgot to add a comma'),
-- (1, 1, 'Did you try this?'),
-- (1, 2, 'You need to do this but not before your return statement'),
-- (1, 3, 'You didn''t inculde a return statement');

INSERT INTO tags (tags)
VALUES
('middleware'),
('javascript'),
('node'),
('react'),
('ruby'),
('DOM'),
('JQuery'),
('D3'),
('express'),
('authorization'),
('authentication'),
('CSS'),
('psql'),
('function'),
('reference'),
('ejs'),
('git'),
('html'),
('fetch');

INSERT INTO messages
(message) VALUES
('Ask me about React...'),
('What error message are you getting?')

-- -- What are people looking at?
-- SELECT users.fname, users.lname, users.username, cohort.cohort, posts.post_title FROM users JOIN cohort ON users.cohortid = cohort.id JOIN views ON views.userid = users.id JOIN posts ON posts.id = views.postid ORDER BY views.date_created DESC;

-- -- Who voted on what?
-- SELECT users.fname, users.lname, cohort.cohort, posts.post_title, commentvotes.vote FROM commentvotes JOIN users ON users.id = commentvotes.userid JOIN cohort ON cohort.id = users.cohortid JOIN posts ON  posts.id = commentvotes.postid;

-- -- Search History
-- SELECT searchhistory.id, users.fname, users.username, searchhistory.search, posts.post_title
-- FROM searchhistory
-- JOIN users ON users.id = searchhistory.userid
-- JOIN posts ON searchhistory.resultpost = posts.id
-- ORDER BY searchdate DESC;

-- -- Sign ups
-- SELECT users.fname, users.lname, users.username, users.email, cohort.cohort FROM users JOIN cohort ON users.cohortid = cohort.id ORDER BY date_created DESC;




