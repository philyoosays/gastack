window.onload = function () {
}

function refreshPage (num) {
  // if ( window.location.href.indexOf('page_y') !== -1 ) {
  //     var match = window.location.href.split('?')[1].split("&")[0].split("=");
  //     document.getElementsByTagName("body")[0].scrollTop = match[1];
  // }
  // var page_y = document.getElementsByTagName("body")[0].scrollTop;
  window.location.href =
    window.location.href.split('v=1').join('')
    .split('?')[0] + '?v=' + num + (
      window.location.href.split('?').length > 1
      ? '&' + window.location.href.split('?')[1]
      : ''
    )
}

function upVote(commentID) {
  const theArrow = document.getElementById('u' + commentID);
  const theOtherArrow = document.getElementById('d' + commentID);
  if(!theArrow.classList.contains('uparrowselected')) {
    if(theOtherArrow.classList.contains('downarrowselected')) {
      theOtherArrow.classList.remove('downarrowselected');
      addVote(commentID);
    } else {
      theArrow.classList.add('uparrowselected');
      addVote(commentID);
    }
  }
}

function addVote(commentID) {
  const theScoreElem = document.getElementById('score' + commentID);
  let score = parseInt(theScoreElem.innerText);
  score++;
  theScoreElem.innerText = score;
  if(window.location.href.indexOf('?') !== -1){
    refreshPage(1);
  } else {
    refreshPage(1);
  }
  document.location.reload(true)
}

function downVote(commentID) {
  const theArrow = document.getElementById('d' + commentID);
  const theOtherArrow = document.getElementById('u' + commentID);
  const theScoreElem = document.getElementById('score' + commentID);
  if(!theArrow.classList.contains('downarrowselected')) {
    if(theOtherArrow.classList.contains('uparrowselected')) {
      theOtherArrow.classList.remove('uparrowselected');
      let score = parseInt(theScoreElem.innerText);
      score--;
      theScoreElem.innerText = score;
      refreshPage(-1);
    } else {
      theArrow.classList.add('downarrowselected');
      let score = parseInt(theScoreElem.innerText);
      score--;
      theScoreElem.innerText = score;
      refreshPage(-1);
    }
  }
}

postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

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














