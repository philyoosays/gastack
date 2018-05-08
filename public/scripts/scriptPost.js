
window.onload = function() {
  const editor = document.querySelector('.ql-editor');
  const postData = document.getElementById('submitformhtml');
  console.log('this is post data', postData.value.replace('&#65279;', '<br>'))
  editor.innerHTML = postData.value.replace('&#65279;', '<br>');
  getTags();
  document.body.onkeypress = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }
  document.getElementById('inserttags').onkeyup = (e) => {
    switch(e.keyCode) {
      case 13:
      case 32:
          finishTag();
        break;
      default:
        break;
    }
  }
}

let globalStore = {};

const toolbarOptions = {
  container:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['emoji'],
    ],
  // handlers: {'emoji': function() {}}                                      // remove formatting button
};

var container = document.getElementById('editor');
var options = {
  debug: 'info',
  modules: {
    syntax: true,
    toolbar: toolbarOptions,
    "emoji-toolbar": true,
    "emoji-shortname": true,
    "emoji-textarea": true,
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    },
  },
  placeholder: 'Compose an epic...',
  readOnly: false,
  theme: 'snow'
};
document.addEventListener("DOMContentLoaded", function() {
  let elements = document.querySelectorAll('pre')
  for (let element of elements) {
    hljs.highlightBlock(element);
  }
  document.querySelectorAll('button').forEach(d => {
    d.setAttribute('data-toggle','tooltip');
  })
});
let quill = new Quill(container, options);
  // document.querySelectorAll('[data-toggle="tooltip"]')



// document.querySelectorAll('[data-toggle="tooltip"]').tooltip();


function storeFormData() {
  let dataHTML = document.querySelector('.ql-editor').innerHTML;
  let dataText = document.querySelector('.ql-editor').innerText;
  let htmlJar = document.getElementById('submitformhtml');
  let textJar = document.getElementById('submitformtext');

  dataText = dataText.replace(/(?:\r\n|\r|\n)/g, ' ');
  dataHTML = dataHTML.replace(/(?:\r\n|\r|\n)/g, '<br>');

  htmlJar.setAttribute('value', dataHTML);
  textJar.setAttribute('value', dataText);

  let tagSpans = document.querySelectorAll('.posttags');
  let tagStorage = '';
  tagSpans.forEach(d => {
    let text = d.textContent.trim();
    tagStorage += text + ' ';
  })
  document.getElementById('inserttags').value = tagStorage.trim();
}



function runCancel() {
  if(confirm("Are you sure you want to navigate away from this page?"))
  {
    history.go(-1);
  }
  return false;
}

function getTags() {
  fetch('/main/post/new/tags')
    .then(response => response.json())
    .then(data => {
      globalStore.tags = data;
    })
    .catch(err => {
      console.log(err)
    })
}

function matchTags() {
  let tagInputField = document.getElementById('inserttags');
  let theOptionList = document.getElementById('thetags');
  let tagLength = tagInputField.value.length;
  let theDataList = document.querySelectorAll('datalist > option')
  let localStore = []
  theDataList.forEach(d => {
    localStore.push(d.value)
  })
  if(tagInputField.value === ' ') {
    tagInputField.value = '';
    return null;
  } else {
    console.log('HEEEELLLLOOOOOOO')
    // compare the value and populate the array
    globalStore.tags.forEach( (tag, i) => {
      let incomingTag = tag.tags.toLowerCase().slice(0,tagLength)
      if(incomingTag === tagInputField.value.toLowerCase()) {
        if(localStore.indexOf(tag.tags) === -1) {
          let element = document.createElement('option')
          element.setAttribute('value', tag.tags)
          element.innerText = tag.tags;
          theOptionList.appendChild(element)
        }
      }
      if(tag.tags.toLowerCase() === tagInputField.value.toLowerCase()) {
        finishTag();
      }
    })
  }
}

function finishTag() {
  let inputField = document.getElementById('inserttags');
  if(inputField.value !== ' ' && inputField.value !== '') {
    let tagContainer = document.getElementById('tagcontainer');
    let tag = inputField.value;
    inputField.value = ''
    let newElement = document.createElement('span');
    newElement.setAttribute('class', 'posttags');
    newElement.setAttribute('onclick', 'removeTag(this)')
    newElement.innerText = tag;
    tagContainer.appendChild(newElement);
  }
}

function removeTag(e) {
  let tagContainer = document.getElementById('tagcontainer');
  tagContainer.removeChild(e)
}



// quill.keyboard.addBinding({
//   key: 'B',
//   shortKey: true
// }, function(range, context) {
//   this.quill.formatText(range, 'bold', true);
// });
