const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex(
    {
     client: 'pg',
     connection: {
       host: '127.0.0.1',
       port: 5432,
       user: '',
       password: '',
       database: 'smart-brain',
     },
   });
   
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Test only - when you have a database variable you want to use
// app.get('/', (req, res)=> {
// res.send(database.users);
// })

app.post('/signin', signin.handleSignin(db, bcrypt) )
app.post('/register', register.handleRegister(db, bcrypt) )
app.get('/profile/:id', profile.handleProfileGet(db) )
app.put('/image', image.handleImage(db) )
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

