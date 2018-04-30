window.onload = function () {
}

function refreshPage () {
  // if ( window.location.href.indexOf('page_y') !== -1 ) {
  //     var match = window.location.href.split('?')[1].split("&")[0].split("=");
  //     document.getElementsByTagName("body")[0].scrollTop = match[1];
  // }
  // var page_y = document.getElementsByTagName("body")[0].scrollTop;
  window.location.href = window.location.href.split('?')[0] + '?page_y=' + 1;
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
  // if(window.location.href.indexOf('?') !== -1){
  //   window.location.href = window.location.href + '&v=1';
  // } else {
  //   window.location.href = window.location.href + '?v=1'
  // }
  // document.location.reload(true)
  refreshPage()
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
      window.location.href = window.location.href + '&v=-1'
      document.location.reload(true)
    } else {
      theArrow.classList.add('downarrowselected');
      let score = parseInt(theScoreElem.innerText);
      score--;
      theScoreElem.innerText = score;
      window.location.href = window.location.href + '&v=-1'
      document.location.reload(true)
    }
  }
}














