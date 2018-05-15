
window.onload = function() {
  // const postData = document.getElementById('submitformhtml');
  // editor.innerHTML = postData.value.replace('&#65279;', '<br>');
  getTags();
  document.body.onkeypress = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }
  let dataField = document.getElementById('submitformhtml');
  let pageType = dataField.getAttribute('data-type')
  let htmlID = document.getElementById('submitformhtml')
  htmlID = htmlID.getAttribute('data');
  console.log('pageType is ', pageType)
  console.log('htmlID is', htmlID)
  if(pageType === 'editpost') {
    let url = `/main/post/${htmlID}/edit`;
    fetchPost(url, htmlID, pageType);
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
  } else if(pageType === 'editcomment') {
    console.log('IA AM RUNINNNGNG')
    let url = `/main/comment/${htmlID}/edit`;
    fetchPost(url, htmlID, pageType);
  } else if(pageType === 'editresource') {
    let url = `/main/resource/${htmlID}/edit`;
    fetchPost(url, htmlID, pageType)
  }


  // document.addEventListener('DOMSubtreeModified', () => {
  //   // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  //   let codeBlock = document.querySelector('pre')
  //   let counter = 0;
  //   codeBlock.classList.forEach(d => {
  //     if(d === 'prettyprint') {
  //       counter++;
  //     }
  //   })
  //   if(counter === 0) {
  //     // codeBlock.classList.remove('ql-syntax')
  //     // codeBlock.classList.add('prettyprint');
  //     // codeBlock.classList.add('linenums');
  //   }
  // })
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
    // element.classList.add('prettyprint');
    // element.classList.add('linenums');
  }
  document.querySelectorAll('button').forEach(d => {
    d.setAttribute('data-toggle','tooltip');
  })
});
let quill = new Quill(container, options);
  // document.querySelectorAll('[data-toggle="tooltip"]')



document.querySelectorAll('[data-toggle="tooltip"]').tooltip();

function fetchPost(url, htmlID, pageType) {
  console.log('fetch is going to', url)
  fetch(url, {
    body: JSON.stringify({ htmlID: htmlID }),
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
      .then(post => {
        if(pageType === 'editpost') {
          forFitBR2(post.posthtml);
        } else if(pageType === 'editcomment') {
          console.log('thisisthedata', post.commenthtml)
          forFitBR2(post.commenthtml);
        } else if(pageType === 'editresource') {
          forFitBR2(post.labelhtml)
        }
      })
      .catch(err => {
        // location.reload();
      })
}

function storeFormData() {
  let editor = document.querySelector('.ql-editor');
  let dataHTML = editor.innerHTML;
  let dataText = editor.innerText;
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

// function forceFitBR(html) {
//   let editor = document.querySelector('.ql-editor');
//   editor.innerHTML = html.slice(0,63);
//   console.log(editor.innerHTML)
//   html = html.slice(63,html.length-6);
//   html = html.split('<br>');
//   let preTag = document.querySelector('pre')
//   html.forEach(data => {
//     preTag.innerHTML += data.trim() + '\n';
//     preTag.innerHTML += '<br>';
//   })
// }

function forFitBR2(variable) {
  let editor = document.querySelector('.ql-editor');
  let tempStore = '';
  let html = variable.split('pre');
  editor.innerHTML = ''
  // console.log('beginning with this', variable)
  // console.log('startingarray', html)
  // console.log('editor is starting with ', editor.innerHTML)
  while(html.length > 0) {
    // console.log('starting round with editor at', editor.innerHTML)
    // console.log('html.length', html.length)
    // console.log('checking', html[0])
    if(html[0].slice(0,1) === '>') {
      // console.log('firstchar is', html[0].slice(0,1))
      html[0] = html[0].slice(1)
      // console.log('cutfirst now', html[0])
    }
    if(html[0].slice(-1) === '<') {
      // console.log('lastcharis', html[0].slice(-1))
      // console.log('cutting last')
      html[0] = html[0].slice(0,-1)
      // console.log('cut the last is now', html[0])
    } else if (html[0].slice(-2) === '</') {
      // console.log('last is', html[0].slice(-2))
      html[0] = html[0].slice(0,-2)
      // console.log('last cut is now', html[0])
    }
    if(html[0] === '') {
      // console.log('its empty')
      html[0] = ''
    } else if(html[0].slice(0,6) === ' class') {
      // console.log('this is a codeblcok', html[0])
      editor.innerHTML += '<pre class="ql-syntax" spellcheck="false">'
      let codeBlock = document.querySelectorAll('pre')
      // console.log('editor is now ', editor.innerHTML)
      codeBlock = codeBlock[codeBlock.length -1]
      let toInsert = html[0].slice(38).split('<br>');
      // console.log('inserting', html[0].slice(38))
      while(toInsert.length > 0) {
        codeBlock.innerHTML += toInsert[0];
        codeBlock.innerHTML += '\n';
        toInsert.shift();
      }
      // console.log('editor got new text', editor.innerHTML)
    } else {
      // console.log('not a codeblock')
      // console.log('adding', html[0])
      editor.innerHTML += html[0];
      // console.log('editor is now ', editor.innerHTML)
    }
    // console.log('ending round')
    html.shift()
    console.log
  }
}



function runCancel() {
  if(confirm("Are you sure you want to navigate away from this page?")) {
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
