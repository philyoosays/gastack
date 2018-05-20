let searchBox = document.getElementById('mainsearch');
let searchString = searchBox.value;


window.onload = () => {
  if(searchString.includes('javascript DOM JQuery CSS function html')) {
    searchBox.value = 'Unit01';
  } else if(searchString.includes('middleware node express authorization authentication psql ejs fetch')) {
    searchBox.value = 'Unit02';
  } else if(searchString.includes('react authorization authentication psql git fetch tokens')) {
    searchBox.value = 'Unit03';
  } else if(searchString.includes('ruby rails psql')) {
    searchBox.value = 'Unit04';
  }
}


let searchBar = document.querySelector('#mainsearch');
if(searchBar.getAttribute('placeholder') !== 'Search through the resources...'){
  let messages = [];
  let prevIndex = 0;
  let randomIndex = 0;
  let theMessage = messages[randomIndex]
  let messagePortion = '';
  let incrementer = 0;
  let toggle = true;
  let initial;
  searchBar.setAttribute('placeholder', '')


  fetch('/main/messages/', {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
      .then(data => {
        data.forEach(d => {
          messages.push(d.message);
        })
        setTimeout(() => {
          randomIndex = Math.floor(Math.random() * messages.length)
          theMessage = messages[randomIndex];
          if(incrementer < messages[randomIndex].length) {
            initial = setInterval(() => {
              if(incrementer < theMessage.length) {
                messagePortion += theMessage[incrementer]
                searchBar.setAttribute('placeholder', messagePortion)
                incrementer++;
                prevIndex = randomIndex;
              }
            }, 70)
          }
        }, 1000)
        setInterval(() => {
          while(randomIndex === prevIndex) {
            randomIndex = Math.floor(Math.random() * messages.length)
          }
          messagePortion = '';
          incrementer = 0;
          theMessage = messages[randomIndex]
          setInterval(() => {
            if(incrementer < theMessage.length) {
              messagePortion += theMessage[incrementer]
              searchBar.setAttribute('placeholder', messagePortion)
              incrementer++;
              prevIndex = randomIndex;
            }
          }, 90);
        }, 15000);
      })
}

// come back to me later maybe redo with regex
function searchKeywords() {
  if(searchString.toLowerCase().includes('unit')) {
    if(searchString.toLowerCase().includes('1')) {
      searchBox.value = 'Javascript DOM JQuery CSS function html flexbox arrays';
    } if(searchString.toLowerCase().includes('2')) {
      searchBox.value = 'middleware node express authorization authentication psql ejs fetch api cookies';
    } if(searchString.toLowerCase().includes('3')) {
      searchBox.value = 'react authorization authentication psql git fetch tokens'
    } if(searchString.toLowerCase().includes('4')) {
      searchBox.value = 'ruby rails psql'
    }
  }
}







