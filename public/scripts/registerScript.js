
function getCohorts() {
  let theProgram = parseInt(document.querySelector('#programid').value)
  fetch('/login/register/cohorts', {
      body: JSON.stringify({ programid: theProgram }),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
  })
  .then(response => response.json())
  .then((data) => {
    let theCohortMenu = document.getElementById('cohortid');
    data.forEach(d => {
      let menuItem = document.createElement('option');
      menuItem.setAttribute('value', d.id)
      menuItem.innerText = d.cohort;
      theCohortMenu.appendChild(menuItem);
    })
  })
}

function checkUserName() {
  let theUsername = document.getElementById('username').value
  fetch('/login/register/user', {
    body: JSON.stringify({ username: theUsername}),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json())
  .then(data => {
    let usernameField = document.getElementById('username');
    let theUsername = usernameField.value;
    let userPTag = document.querySelectorAll('p')[2];
    if(data !== '') {
      usernameField.value = '';
      usernameField.setAttribute('placeholder', theUsername + ' is taken');
      userPTag.setAttribute('style', 'color: red');
    } else {
      usernameField.removeAttribute('style');
      userPTag.removeAttribute('style');
    }
  })
}

function checkPass() {
  let passOne = document.getElementById('password');
  let passTwo = document.getElementById('passwordcheck');
  let passOneLabel = document.querySelectorAll('p')[4];
  if(passOne.value !== '' && passTwo.value !== '') {
    if(passOne.value !== passTwo.value) {
      passOne.value = '';
      passTwo.value = '';
      passOne.setAttribute('placeholder', 'passwords don\'t match');
      passOneLabel.setAttribute('style', 'color: red');
    } else {
      passOne.setAttribute('placeholder', 'enter password again');
      passOneLabel.removeAttribute('style');
    }
  }
}

function checkEmail() {
  let theEmail = document.getElementById('email').value;
  let submitButton = document.querySelector('input[type=submit]');
  let verifyMessage = document.getElementById('verifying');
  submitButton.setAttribute('disabled', true);
  verifyMessage.removeAttribute('style');
  fetch('/login/register/email', {
    body: JSON.stringify({ email: theEmail}),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
    .then(response => response.json())
      .then(data => {
        let emailField = document.getElementById('email');
        let emailPTag = document.querySelectorAll('p')[3];
        if(data !== '') {
          emailField.value = '';
          emailField.setAttribute('placeholder', theEmail + ' is taken');
          emailPTag.setAttribute('style', 'color: red');
        } else {
          emailField.removeAttribute('style');
          emailPTag.removeAttribute('style');
          // fetch(`https://api.trumail.io/v2/lookups/json?email=${theEmail}&token=${process.env.MAILAPI}`)
          //   .then(response => response.json())
          //   .then(data => {
          //     if(Object.keys(data).indexOf('address') === -1) {
          //       emailPTag.removeAttribute('style');
          //       submitButton.removeAttribute('disabled');
          //       verifyMessage.setAttribute('style', 'visibility: hidden');
          //     } else {
          //     // if(data.deliverable === true) {
          //       if(data.fullInbox === false) {
          //         if(data.hostExists === true) {
          //           if(data.catchAll === false && theEmail.split('@')[1] !== 'q.com') {
          //             if(data.disposable === false) {
          //               emailPTag.removeAttribute('style');
          //               submitButton.removeAttribute('disabled');
          //               verifyMessage.setAttribute('style', 'visibility: hidden');
          //             } else { emailMessage('disposable'); }
          //           } else { emailMessage('catchAll'); }
          //         } else { emailMessage('host'); }
          //       } else { emailMessage('fullInbox'); }
          //     // } else { emailMessage('deliverable'); }
          //     }
          //   })
          //   .catch(err => {
          //     emailPTag.removeAttribute('style');
          //     submitButton.removeAttribute('disabled');
          //     verifyMessage.setAttribute('style', 'visibility: hidden');
          //   })
        }
      })
}

function emailMessage(string) {
  let emailMessage = '';
  switch(string) {
    case 'disposable':
      emailMessage = 'you entered a bad email';
      break;
    case 'catchAll':
      emailMessage = 'is this email a junk collector?';
      break;
    case 'host':
      emailMessage = 'email host does not exist';
      break;
    case 'fullInbox':
      emailMessage = 'your inbox is full';
      break;
    case 'deliverable':
      emailMessage = 'non-deliverable address';
      break;
    default:
      break;
  }
  let emailField = document.getElementById('email');
  let emailLabel = document.querySelectorAll('p')[3];
  emailField.value = ''
  emailField.setAttribute('placeholder', emailMessage);
  emailLabel.setAttribute('style', 'color: red');
  document.getElementById('verifying').setAttribute('style', 'visibility: hidden')
}





















