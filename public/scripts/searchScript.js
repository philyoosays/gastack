
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
        console.log(data)
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
