const db = require('../config/connection');

module.exports = {
  fullSearch(language, string) {
    return db.any(`
      SELECT
        posts.*,
        users.username,
        programs.programshort,
        cohort.cohort
      FROM(
        SELECT postid, MAX(ts_rank) FROM (

          SELECT * FROM(
            SELECT postid, ts_rank(postvector,to_tsquery($1, $2))
            FROM (

              WITH document AS
                (SELECT posts.id AS postid,
                  setweight(to_tsvector(posts.post_title), 'A') ||
                  setweight(to_tsvector(posts.post), 'B') ||
                  setweight(to_tsvector('simple', users.fname), 'D') ||
                  setweight(to_tsvector('simple', users.lname), 'D') ||
                  setweight(to_tsvector(coalesce(posts.tags,'')), 'A')
                  AS postvector
                FROM posts JOIN users
                  ON posts.userid = users.id
                WHERE isdeleted = false
                )
              SELECT document.postid, document.postvector FROM document
              UNION ALL
              SELECT documentTwo.postid, documentTwo.postvector
              FROM document JOIN
                (SELECT postid,
                  setweight(to_tsvector(comments.comment),'B') ||
                  setweight(to_tsvector('simple', users.fname), 'D') ||
                  setweight(to_tsvector('simple', users.lname), 'D')
                  AS postvector
              FROM comments JOIN users
                ON comments.userid = users.id) AS documentTwo
                    ON document.postid = documentTwo.postid

            ) AS fullDocument
          ) AS results
          WHERE ts_rank > 0

        ) AS final_output
        GROUP BY postid

      ) AS final_output_id
      JOIN posts ON final_output_id.postid = posts.id
      JOIN users ON posts.userid = users.id
      JOIN programs ON users.programid = programs.id
      JOIN cohort ON users.cohortid = cohort.id
      ORDER BY final_output_id.max DESC
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
  },

  findResources(language, string) {
    return db.any(`
      SELECT orderedrank.userid, resources.*, users.username
        FROM
          (
          SELECT ranked_document.userid, MAX(ts_rank) AS ranking FROM
            (
            SELECT document.userid, ts_rank(vector, to_tsquery($1, $2))
              FROM
              (
              SELECT
                  resources.userid,
                  setweight(to_tsvector(resources.label),'A') ||
                  setweight(to_tsvector('simple', users.fname), 'C') ||
                  setweight(to_tsvector('simple', users.lname), 'C')
              AS vector FROM resources
              JOIN users ON resources.userid = users.id
              ) AS document
            ) AS ranked_document
            WHERE ts_rank > 0
            GROUP BY ranked_document.userid
            ORDER BY ranking DESC
        ) AS orderedrank
      JOIN users ON orderedrank.userid = users.id
      JOIN resources ON orderedrank.userid = resources.userid
      `, [language, string]);
  },
  // I had initially wrote these but they are not antiquated compered to fullSearch
  // postSearch(language, string) {
  //   return db.any(`
  //     SELECT * FROM (
  //       SELECT
  //         posts.*,
  //         setweight(to_tsvector(posts.post_title),'A') ||
  //         setweight(to_tsvector(posts.post),'B') ||
  //         setweight(to_tsvector('simple', users.fname), 'C') ||
  //         setweight(to_tsvector('simple', users.lname), 'C') ||
  //         setweight(to_tsvector(coalesce(posts.tags,'')), 'A')
  //           AS postVector
  //       FROM posts JOIN users
  //         ON posts.userid = users.id
  //     ) document
  //     WHERE document.postVector @@ to_tsquery($1, $2)
  //     ORDER BY ts_rank(
  //       document.postVector,
  //       to_tsquery($1, $2)
  //     )
  //     `,[language, string]);
  // },

  // commentSearch(language, string) {
  //   return db.any(`
  //     SELECT * FROM (
  //       SELECT
  //         posts.*,
  //         to_tsvector(posts.post) AS commentVector
  //       FROM comments JOIN posts
  //         ON comments.postid = posts.id
  //     ) document
  //     WHERE document.commentVector @@ to_tsquery($1, $2)
  //     ORDER BY ts_rank(
  //       document.commentVector,
  //       to_tsquery($1, $2)
  //     )
  //     `, [language, string]);
  // },
}


















