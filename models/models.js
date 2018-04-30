const db = require('../config/connection');

module.exports = {
  addUser(data) {
    return db.one(`
      INSERT INTO users (
        fname,
        lname,
        email,
        username,
        password_digest,
        programid
      )
      VALUES (
        $/fname/,
        $/lname/,
        $/email/,
        $/username/,
        $/password_digest/,
        $/programid/
      )
      RETURNING *
      `, data);
  },

  findOneUser(data) {
    return db.any(`
      SELECT *
      FROM users
      WHERE username = $1
      `, data);
  },

  findAllPrograms() {
    return db.many(`
      SELECT * FROM programs
      `);
  },

  findAllTags(tag) {
    return db.many(`
      SELECT * FROM posts
      WHERE tags ILIKE $1
      ORDER BY date_created
      `, tag);
  },

  saveSearch(data) {
    return db.one(`
      INSERT INTO searchhistory
      (userid, language, search, resultpost)
      VALUES
      ($/userid/, $/language/, $/search/, $/resultpost/)
      RETURNING id
      `, data)
  },

  updateSearch(data) {
    return db.none(`
      UPDATE searchhistory
      SET resultpost = $/postid/
      WHERE id = $/searchid/
      `, data);
  },

  getOnePost(id) {
    return db.one(`
      SELECT posts.*, users.username FROM posts
      JOIN users ON posts.userid = users.id
      WHERE posts.id = $1
      `, id);
  },

  makeOnePost(data) {
    return db.one(`
      INSERT INTO posts
      (userid, post_title, post, posthtml, tags)
      VALUES (
        $/userid/,
        $/post_title/,
        $/post/,
        $/posthtml/,
        $/tags/
      ) RETURNING id
      `, data);
  },

  makeOneComment(data) {
    return db.none(`
      INSERT INTO comments
      (userid, postid, comment, commenthtml)
      VALUES (
        $/userid/,
        $/postid/,
        $/comment/,
        $/commenthtml/
      )
      `, data);
  },

  findAllComments(postid) {
    return db.any(`
      SELECT comments.*, users.username
      FROM comments
      JOIN users
        ON comments.userid = users.id
      WHERE postid = $1
      ORDER BY
        comment_score DESC,
        date_created DESC
      `, postid);
  },

}





















