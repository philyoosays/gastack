description = [
  'Gloomy',
  'Vivacious',
  'Hungry',
  'Voracious',
  'Vivacious',
  'Green',
  'Blue',
  'Yellow',
  'Red',
  'Ominous',
  'Irksome',
  'Courageous',
  'Flatulent',
  'Nebulous',
  'Gaseous',
  'Crumbly',
  'Cowardly',
  'Naked',
  'Respectable',
  'Stately',
  'Luminous',
  'Iridescent',
  'Mischievous',
  'Childish',
  'Chocolatey',
  'Courteous',
  'Cordially',
  'Spikey',
  'Stingey',
  'Rural',
  'Urban',
  'Speedy',
  'Dapper',
  'Symantical',
  'Competent',
  'Competitive',
  'Demanding',
  'Commanding',
  'Hilarious',
  'Laughable',
  'Clumsy',
  'Awkward',
  'Tauriest',
  'Weary',
]

noun = [
  'Cow',
  'Alien',
  'TotemPole',
  'MoleRat',
  'ChinaSet',
  'Priestess',
  'Overlord',
  'Juror',
  'Baker',
  'Rocketship',
  'Shadetree',
  'Lumberjack',
  'Lighthouse',
  'Hashtag',
  'SuperSpy',
  'Gemstone',
  'StarLight',
  'Leprechaun',
  'GasGiant',
  'Vaudevillain',
  'Muse',
  'Pixie',
  'Imp',
  'RayOfLight',
  'Gambino',
  'Siren',
  'Lurker',
  'Commando',
  'Capitan',
  'Frenchman',
  'Olympian',
  'Arbiter'
]

index1 = Math.floor(Math.random() * description.length)
index2 = Math.floor(Math.random() * description.length)
index3 = Math.floor(Math.random() * noun.length)

while(index1 === index2) {
  index2 = Math.floor(Math.random() * description.length)
}

if(description[index1].slice(-1) === 'y') {
  wordOne = description[index1]
} else if(description[index1].slice(-2) === 'le') {
  wordOne = description[index1] + 'y'
} else if(description[index1] === 'yellow' || description[index1] === 'blue') {
  wordOne = description[index1] + 'ish'
} else {
  wordOne = description[index1] + 'ly'
}

string = wordOne + '-' + description[index2] + '-' + noun[index3]

console.log(index1)
console.log(index2)
console.log(index3)
console.log(string)
