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
      SELECT
        posts.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM posts JOIN users
        ON posts.userid = users.id
      JOIN programs ON users.programid = programs.id
      JOIN cohort ON users.cohortid = cohort.id
      WHERE posts.id = $1
      `, id);
  },

  getOneComment(id) {
    return db.one(`
      SELECT
        comments.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM comments JOIN users
        ON comments.userid = users.id
      JOIN programs ON users.programid = programs.id
      JOIN cohort ON users.cohortid = cohort.id
      WHERE comments.id = $1
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

  findAllComments(data) {
    return db.any(`
      SELECT main.*, SUM AS votesum FROM
        (SELECT
        comments.*,
        users.username,
        cohort.cohort,
        programs.programshort,
        uservotes.vote
      FROM comments
      JOIN users
        ON comments.userid = users.id
      JOIN programs ON users.programid = programs.id
      JOIN cohort ON cohort.id = users.cohortid
      LEFT OUTER JOIN
        (SELECT *
        FROM commentvotes
        WHERE userid = $/userid/
                        ) AS uservotes
      ON comments.id = uservotes.commentid
      WHERE comments.postid = $/postid/
      ORDER BY
        comments.comment_score DESC,
        comments.date_created DESC) AS main

      LEFT OUTER JOIN
        (SELECT
          commentid,
          SUM(vote)
        FROM commentvotes
        GROUP BY commentid
                        ) AS votecount
      ON main.id = votecount.commentid
      ORDER BY main.date_created DESC
      `, data);
  },

  editOnePost(data) {
    return db.none(`
      UPDATE posts
      SET
        post_title = $/title/,
        post = $/post/,
        posthtml = $/posthtml/,
        tags = $/tags/,
        date_edited = NOW()
      WHERE id = $/id/
      `, data);
  },

  editOneComment(data) {
    return db.one(`
      UPDATE comments
      SET
        comment = $/comment/,
        commenthtml = $/commenthtml/,
        date_edited = NOW()
      WHERE id = $/id/
      RETURNING postid
      `, data);
  },

  findOneVote(data) {
    return db.any(`
      SELECT *
      FROM commentvotes
      WHERE userid = $/userid/
      AND commentid = $/commentid/
      `, data);
  },

  updateVote(data) {
    return db.none(`
      UPDATE commentvotes
      SET
        vote = $/vote/
      WHERE
        userid = $/userid/
      AND commentid = $/commentid/
      AND postid = $/postid/
      `, data);
  },

  addNewVote(data) {
    return db.none(`
      INSERT INTO commentvotes
      (commentid, userid, postid, vote)
      VALUES
      ($/commentid/, $/userid/, $/postid/, $/vote/)
      `, data);
  },

  findVoteSum(data) {
    return db.one(`
      SELECT SUM(vote)
      FROM commentvotes
      WHERE commentid = $/commentid/
      AND postid = $/postid/
      GROUP BY commentid
      `, data);
  },

  findAllCohorts(id) {
    return db.any(`
      SELECT * FROM cohort
      WHERE programid = $1
      `, id);
  },

  findApprovedPerson(email) {
    return db.any(`
      SELECT id
      FROM allowedusers
      WHERE email = $1
      `, email);
  },

  listAllTags() {
    return db.many(`
      SELECT tags FROM tags
      `);
  },

  findAllResources() {
    return db.any(`
      SELECT * FROM resources
      ORDER BY date_created DESC
      `);
  },

  findUserProgramCohort(programid, cohortid) {
    return db.one(`
      SELECT programs.program, cohort.cohort
      FROM programs
      JOIN cohort ON programs.id = cohort.programid
      WHERE programs.id = $1
      AND cohort.id = $2
      `, [programid, cohortid]);
  }
}





















