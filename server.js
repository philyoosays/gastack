require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');

const authRouter = require('./auth/authRouter');
const profileRouter = require('./routes/profileRouter');
const mainRouter = require('./routes/mainRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('superSecret', process.env.SECRET);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
    genid: function() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }
              return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },
    secret: app.get('superSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30000
    }
  })
);

app.use('/profile', profileRouter)
app.use('/main', mainRouter)
app.use('/login', authRouter)

app.get('/', (req, res) => {
  res.redirect('/auth/login')
})

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
