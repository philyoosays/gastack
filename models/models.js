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
        programid,
        cohortid
      )
      VALUES (
        $/fname/,
        $/lname/,
        $/email/,
        $/username/,
        $/password_digest/,
        $/programid/,
        $/cohortid/
      )
      RETURNING *
      `, data);
  },

  findOneUser(data) {
    return db.any(`
      SELECT
        id, fname, lname, email, username,
        programid, cohortid, language,
        blurb, location, website, github,
        account_type, score
      FROM users
      WHERE username ILIKE $1
      `, data);
  },

  findOneUserPass(data) {
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

  findAllTutorials() {
    return db.any(`
      SELECT * FROM tutorials
      ORDER BY date_created DESC
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

  saveTutorialSearch(data) {
    return db.one(`
      INSERT INTO tutorialsearch
      (userid, language, search, resulttutorial)
      VALUES
      ($/userid/, $/language/, $/search/, $/resulttutorial/)
      RETURNING id
      `, data)
  },

  updateTutorialSearch(data) {
    return db.none(`
      UPDATE tutorialsearch
      SET resulttutorial = $/postid/
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

  getOneTutorial(id) {
    return db.one(`
      SELECT
        tutorials.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM tutorials JOIN users
        ON tutorials.userid = users.id
      JOIN programs ON users.programid = programs.id
      JOIN cohort ON users.cohortid = cohort.id
      WHERE tutorials.id = $1
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
    return db.one(`
      INSERT INTO comments
      (userid, postid, comment, commenthtml)
      VALUES (
        $/userid/,
        $/postid/,
        $/comment/,
        $/commenthtml/
      ) RETURNING id
      `, data);
  },

  makeOneTutorial(data) {
    return db.one(`
      INSERT INTO tutorials
      (userid, title, post, posthtml, videohtml, tags)
      VALUES (
        $/userid/,
        $/title/,
        $/post/,
        $/posthtml/,
        $/videohtml/,
        $/tags/
      ) RETURNING id
      `, data);
  },

  makeBackUp(data) {
    return db.none(`
      INSERT INTO backup
        (type, userid, postid, post_title, post,
          posthtml, posttags, commentid, comment,
          commenthtml)
      VALUES (
        $/type/,
        $/userid/,
        $/postid/,
        $/post_title/,
        $/post/,
        $/posthtml/,
        $/tags/,
        $/commentid/,
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
        AND isdeleted = false
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
      SELECT resources.*, users.username FROM resources
      JOIN users ON users.id = resources.userid
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
  },

  findAllNewPosts() {
    return db.many(`
      SELECT
        posts.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM posts
      JOIN users ON posts.userid = users.id
      JOIN programs ON programs.id = users.programid
      JOIN cohort ON cohort.id = users.cohortid
      WHERE isdeleted = false
      ORDER BY posts.date_created DESC
      LIMIT 15
      `);
  },

  editProfile(data) {
    return db.one(`
      UPDATE users
      SET
        fname = $/fname/,
        lname = $/lname/,
        email = $/email/,
        blurb = $/blurb/,
        location = $/location/,
        website = $/website/,
        github = $/github/
      WHERE id = $/userid/
      RETURNING username
      `, data);
  },

  findAllUserPosts(username) {
    return db.any(`
      SELECT
        posts.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM posts
      JOIN users ON posts.userid = users.id
      JOIN programs ON programs.id = users.programid
      JOIN cohort ON cohort.id = users.cohortid
      WHERE users.username = $1
      ORDER BY posts.date_created DESC
      `, username);
  },

  createNewResource(data) {
    return db.none(`
      INSERT INTO resources
        (userid, label, labelhtml)
      VALUES
        ($/userid/, $/label/, $/labelhtml/)
      `, data);
  },

  saveView(data) {
    return db.none(`
      INSERT INTO views
        (postid, userid)
      VALUES
        ($/postid/, $/userid/)
      `, data);
  },

  saveTutorialView(data) {
    return db.none(`
      INSERT INTO tutorialviews
        (tutorialid, userid)
      VALUES
        ($/postid/, $/userid/)
      `, data);
  },

  findUserView(data) {
    return db.any(`
      SELECT * FROM views
      WHERE postid = $/postid/
        AND userid = $/userid/
      `, data);
  },

  findUserViewTutorial(data) {
    return db.any(`
      SELECT * FROM tutorialviews
      WHERE tutorialid = $/postid/
        AND userid = $/userid/
      `, data);
  },

  deleteFromPosts(postid) {
    return db.none(`
      UPDATE posts
        SET
          isdeleted = true
      WHERE id = $1
      `, postid);
  },

  deleteFromComments(commentid) {
    return db.one(`
      UPDATE comments
        SET isdeleted = true
      WHERE id = $1
      RETURNING postid
      `, commentid)
  },

  findOneResource(resourceid) {
    return db.one(`
      SELECT * FROM resources
      WHERE id = $1
      `, resourceid);
  },

  editOneResource(data) {
    return db.none(`
      UPDATE resources
        SET
          label = $/label/,
          labelhtml = $/labelhtml/
      WHERE id = $/id/
      `, data);
  },

  getAllMessages() {
    return db.any(`
      SELECT message FROM messages
      `)
  },

  findOneEmail(email) {
    return db.any(`
      SELECT email FROM users
      WHERE email = $1
      `, email);
  },

  countUserScore(userid) {
    return db.any(`
      SELECT SUM(postscore + cscore + vscore) AS score
      FROM (
        SELECT COUNT(posts.id)*10 AS postscore, commentscore, votescore,
          (CASE WHEN commentscore IS NULL THEN 0 ELSE commentscore END) AS cscore,
          (CASE WHEN votescore IS NULL THEN 0 ELSE votescore END) AS vscore
        FROM posts
          LEFT OUTER JOIN (
            SELECT COUNT(id) * 10 AS commentscore, votecount.votescore, comments.userid
            FROM comments
            JOIN (
              SELECT COUNT(id) * 2 AS votescore, commentvotes.userid
              FROM commentvotes
              WHERE userid = $1
              AND vote != 0
              GROUP BY userid) AS votecount
          ON comments.userid = votecount.userid
          WHERE comments.userid = $1 AND isdeleted = FALSE
          GROUP BY votecount.votescore, comments.userid) AS commentcount
        ON posts.userid = commentcount.userid
        WHERE posts.userid = $1 AND posts.isdeleted = FALSE
        GROUP BY commentcount.commentscore, commentcount.votescore ) AS allcount
      `, userid);
  },

  updateScore(score, userid) {
    return db.none(`
      UPDATE users
        SET score = $1
      WHERE id = $2
      `, [score, userid]);
  },

  getUserScore(userid) {
    return db.one(`
      SELECT score FROM users
      WHERE id = $1
      `, userid);
  },


}





















