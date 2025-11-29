const express = require('express');
const morgan = require('morgan')
const app = express();
const db = require('./config/db');
const UserModel = require('./models/user');

// middleware custom
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//static files
app.use(express.static("public"))

app.set("view engine", "ejs");

// routes

app.get('/', (req,res,next) => {
    const a = 2;
    const b = 3;
    console.log(a + b);
    next();
},(req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.post('/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body
    
    await UserModel.create({    
        username: name,   // FIXED (username was undefined)
        email: email,
        password: password   
    })

    res.send('User registered successfully');   // FIXED (removed duplicate create/send)
})

app.get('/about', (req, res) => {
    res.send("This is the about page");
})

app.get('/profile', (req, res) => {
    res.send("This is the profile page");
})

app.post('/get-form-data', (req, res) => {
    console.log(req.body)
    res.send("data received")
})

app.listen(3000);
