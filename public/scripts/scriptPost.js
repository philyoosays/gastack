

const toolbarOptions = {
  container:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
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
  document.querySelectorAll('[data-toggle="tooltip"]').tooltip();



// document.querySelectorAll('[data-toggle="tooltip"]').tooltip();


function storeFormData() {
  let dataHTML = document.querySelector('.ql-editor').innerHTML;
  let dataText = document.querySelector('.ql-editor').innerText;
  let htmlJar = document.getElementById('submitformhtml');
  let textJar = document.getElementById('submitformtext');

  dataText = dataText.replace(/(?:\r\n|\r|\n)/g, ' ');

  htmlJar.setAttribute('value', dataHTML);
  textJar.setAttribute('value', dataText);
}


// quill.keyboard.addBinding({
//   key: 'B',
//   shortKey: true
// }, function(range, context) {
//   this.quill.formatText(range, 'bold', true);
// });
