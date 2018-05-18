window.onload = function() {
  // fetch('/login/loggedin')
  //   .then(response => response.json())
  //     .then(data => {
  //       if(data.loggedin === true) {
  //         window.location.replace('/main')
  //       }
  //     })
}


function checkUser() {
  let theLoginField = document.querySelector('input[type="input"]');
  fetch('/login/user', {
    body: JSON.stringify({ username: theLoginField.value}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
  })
  .then(response => response.json())
    .then(response => {
      if(response === ''){
        let theUsername = theLoginField.value;
        theLoginField.setAttribute('placeholder', theUsername + ' doesn\'t exist');
        theLoginField.value = '';
      }
    })
}

function runBadPass() {
  let thePassField = document.querySelector('input[type="password"]');
  thePassField.setAttribute('placeholder', 'bad password');
  thePassField.value = '';
}
