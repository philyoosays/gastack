

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
});
let quill = new Quill(container, options);
console.log(quill)

function storeFormData() {
  let about = document.getElementById('submit-form');
  let data = document.querySelector('ql-editor')
  let form = document.querySelector('form');

debugger;
  console.log(JSON.stringify(form))
  about.value = data.outerHTML;
  console.log(about.value)


  // about.value = JSON.stringify(quill.getContents());
}


// quill.keyboard.addBinding({
//   key: 'B',
//   shortKey: true
// }, function(range, context) {
//   this.quill.formatText(range, 'bold', true);
// });
