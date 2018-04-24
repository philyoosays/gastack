DROP DATABASE gastackoverflow;
CREATE DATABASE gastackoverflow;

\c gastackoverflow

DROP TABLE IF EXISTS ????;
-- WHAT DOES CASCADE DO?

CREATE TABLE programs (
id SERIAL PRIMARY KEY,
program TEXT NOT NULL,
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
fname TEXT DEFAULT '',
lname TEXT DEFAULT '',
email VARCHAR(40) UNIQUE NOT NULL,
username VARCHAR(25) UNIQUE NOT NULL,
password_digest TEXT NOT NULL,
avatar TEXT,
programid INTEGER REFERENCES programs(id),
blurb VARCHAR(255),
website VARCHAR(255),
account_type TEXT,
active BOOLEAN DEFAULT true,
date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
post VARCHAR(255) UNIQUE NOT NULL,
date_created TIMESTAMP NOT NULL DEFAULT NOW(),
date_edited TIMESTAMP DEFAULT NOW(),
post_score INTEGER DEFAULT 0
);

CREATE TABLE posttags (
id SERIAL PRIMARY KEY,
postid INTEGER REFERENCES posts(id),
tags TEXT NOT NULL
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id),
comment VARCHAR(255) NOT NULL,
);

CREATE TABLE favorites (
id SERIAL PRIMARY KEY,
userid INTEGER REFERENCES users(id),
postid INTEGER REFERENCES posts(id)
);
