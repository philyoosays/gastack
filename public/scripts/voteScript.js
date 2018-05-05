window.onload = function () {
}

function upVote(commentID, postID) {
  console.log(commentID)
  const theArrow = document.getElementById('u' + commentID);
  const theOtherArrow = document.getElementById('d' + commentID);
  const theCount = document.getElementById('score' + commentID);
  if(!theArrow.classList.contains('uparrowselected')) {
    if(theOtherArrow.classList.contains('downarrowselected')) {
      theOtherArrow.classList.remove('downarrowselected');
      postData('/main/vote', {commentID, postID, vote: 0})
        .then((data) => {
          theCount.innerText = data.sum;
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      theArrow.classList.add('uparrowselected');
      postData('/main/vote', {commentID, postID, vote: 1})
        .then((data) => {
          theCount.innerText = data.sum;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

function downVote(commentID, postID) {
  const theArrow = document.getElementById('d' + commentID);
  const theOtherArrow = document.getElementById('u' + commentID);
  const theCount = document.getElementById('score' + commentID);
  if(!theArrow.classList.contains('downarrowselected')) {
    if(theOtherArrow.classList.contains('uparrowselected')) {
      theOtherArrow.classList.remove('uparrowselected');
      postData('/main/vote', {commentID, postID, vote: 0})
        .then((data) => {
          theCount.innerText = data.sum;
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      theArrow.classList.add('downarrowselected');
      postData('/main/vote', {commentID, postID, vote: -1})
        .then((data) => {
          theCount.innerText = data.sum;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

function grabData() {
  let dataBucket = document.getElementById('databucket');
  let title = document.querySelector('.posttitlebox > h2').textContent;
  let submitformtext = document.querySelector('.showposthtml').innerText;
  let submitformhtml = document.querySelector('.showposthtml').innerHTML;
  let allTags = document.querySelectorAll('#searchtag');
  let tags = ''
  if(allTags.length > 0) {
    allTags.forEach(d => {
      tags += d.defaultValue + ' ';
    })
    tags = tags.trim();
  }
  let array = [{title}, {submitformtext}, {submitformhtml}, {tags}, {isdeleted: true}];
  console.log(array)
  array.forEach(d => {
    let element = document.createElement('input');
    element.setAttribute('type', 'hidden');
    element.setAttribute('name', Object.keys(d)[0]);
    element.setAttribute('value', Object.values(d)[0]);
    dataBucket.appendChild(element);
  })
}














