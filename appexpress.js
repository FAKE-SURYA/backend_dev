const express = require('express');
const morgan = require('morgan')
const app = express();

app.use(morgan('dev'))
    // set the view engine to ejs

app.set("view engine", "ejs");

// middleware custom

app.use((req,res,next) => {
    console.log('this is middleware')
    
    const a = 2
    const b = 3 

    console.log(a+b)

    return next()

})
// routes

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/about', (req, res) => {
    res.send("This is the about page");
})

app.get('/profile', (req, res) => {
    res.send("This is the profile page");
})

app.listen(3000);

