const db = require('../config/connection');

module.exports = {
  postSearch(language, string) {
    return db.any(`
      SELECT * FROM posts
      WHERE postvector @@ to_tsquery
        ($1, $2)
      `,[language, string]);
  },

  commentSearch(language, string) {
    return db.any(`
      SELECT * FROM comments
      WHERE commentvector @@ to_tsquery
        ($1, $2)
      `, [language, string]);
  },

  addPost(language, userid, string) {
    return db.one(`
      INSERT INTO posts
        (userid, post, postvector)
      VALUES
        ($2, $3, (to_tsvector($1, $3)))
      RETURNING id
      `, [language, userid, string]);
  },

  addComment(language, postid, userid, string) {
    return db.one(`
      INSERT INTO comments
        (userid, postid, comment, commentvector)
      VALUES
        ($3, $2, $4, (to_tsvector($1, $4)))
      `, [language, postid, userid, string]);
  },

  saveSearchString(language, userid, string) {
    return db.one(`
      INSERT INTO searchhistory
        (userid, search)
      VALUES
        ($2, $3)
      `, [lanugage, userid, search]);
  },

  saveSearchResult(searchid, postid) {
    return db.none(`
      UPDATE searchhistory
      SET resultpost = $2
      WHERE id = $1
      `, [searchid, postid]);
  }
}


















