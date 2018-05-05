require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg')
const session = require('express-session');
const methodOverride = require('method-override');
const pgp = require('pg-promise');
const config = require('./config/config');
const pgSession = require('connect-pg-simple')(session);

const authRouter = require('./auth/authRouter');
const profileRouter = require('./routes/profileRouter');
const mainRouter = require('./routes/mainRouter');
const apiRouter = require('./routes/apiRouter')

const app = express();
const PORT = process.env.PORT || 4000;


app.set('superSecret', process.env.SECRET);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
    store: new pgSession({
      // conString : process.env.DATABASE_URL
      conString : 'postgresql://' + config.host + ':' + config.port + '/' + config.database
    }),
    secret: app.get('superSecret'),
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800000
    },
  })
);

app.use('/profile', profileRouter)
app.use('/main', mainRouter)
app.use('/login', authRouter)
// app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
