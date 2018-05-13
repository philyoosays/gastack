
let searchBar = document.querySelector('#mainsearch');
let messages = ['What are you looking for today?'];
let prevIndex = 0;
let randomIndex = 0;
let theMessage = messages[randomIndex]
let messagePortion = '';
let incrementer = 0;
let toggle = true;
let initial;

fetch('/main/messages')
  .then(response => response.json())
    .then(data => {
      console.log(data)
    })

setTimeout(() => {
  if(incrementer < theMessage.length) {
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
