const express = require("express");
const cors = require("cors");
const knex = require('knex');
const bcrypt = require('bcryptjs');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'face-recognition-db'
  }
});

const database = [];
const app = express();
const port = 3000;

// db.select('*').from('users').then(data => console.log(data));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => { res.json(database.users) });

app.post("/signin", (req, res) => { signin.handleSignin(req, res, bcrypt, db) });

app.post("/register", (req, res) => { register.handleRegister(req, res, bcrypt, db) })

app.get("/profile/:id" , (req, res) => { profile.handleProfile(req, res, db) });

app.put("/image", (req, res) => { image.handleImage(req, res, db) });

app.post("/imageUrl", (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});