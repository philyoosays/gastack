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
  }
}
