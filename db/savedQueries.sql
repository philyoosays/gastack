-- What are people looking at?
SELECT
  users.fname,
  users.lname,
  users.username,
  cohort.cohort,
  posts.post_title
FROM users JOIN cohort
  ON users.cohortid = cohort.id
JOIN views ON views.userid = users.id
JOIN posts ON posts.id = views.postid
ORDER BY views.date_created DESC;

-- Who voted on what?
SELECT
  users.fname,
  users.lname,
  cohort.cohort,
  posts.post_title,
  commentvotes.vote
FROM commentvotes JOIN users
  ON users.id = commentvotes.userid
JOIN cohort ON cohort.id = users.cohortid
JOIN posts ON  posts.id = commentvotes.postid;

-- Search History
SELECT
  searchhistory.id,
  users.fname,
  users.username,
  searchhistory.search,
  posts.post_title
FROM searchhistory
JOIN users ON users.id = searchhistory.userid
LEFT OUTER JOIN posts ON searchhistory.resultpost = posts.id
ORDER BY searchdate DESC;

-- Sign ups
SELECT
  users.fname,
  users.lname,
  users.username,
  users.email,
  cohort.cohort
FROM users JOIN cohort
  ON users.cohortid = cohort.id
ORDER BY date_created DESC;
