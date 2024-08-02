const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./db/connection');
const app = express();

const sess = {
  secret: 'Super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Define your routes
const homeRoutes = require('./controllers/api/homeController');
const userRoutes = require('./controllers/api/userController');
const postRoutes = require('./controllers/api/postController');
const commentRoutes = require('./controllers/api/commentController');

app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
