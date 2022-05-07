const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://asad:asad@cluster0.7zja0.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);


// cookies
app.get('/set-cookies', (req, res) => {

  res.cookie('newUser', false)
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true });

  res.send('you got cookies!')
});

app.get('/read-cookies', (req, res) => {

  const cookie = req.cookies;
  console.log(cookie);

  res.json(cookie);

})