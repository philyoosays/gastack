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


}





















