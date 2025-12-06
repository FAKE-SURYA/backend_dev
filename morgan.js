const express = require('express');
const morgan = require('morgan')
const app = express();
const dbConnection = require('./config/db');
const userModel = require('./models/user');

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
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

   const newUser = await userModel.create({
        username : username,
        email : email,
        password : password

    })

    res.send(newUser)
    })


    app.get('/get-users', (req, res)=> {
        userModel.findOne({
            username :"iblame_suryaa"
        }).then((users) => {
            res.send(users)
        })

    })

    app.get('/update-user', async (req,res) => {
       await userModel.findOneAndUpdate({

            username : "iblame_suryaa"
        },
        {
            email: 'ab@c.com'
        })
         res.send("user updated")
    })


    app.get('/delete-user', async (req, res) => {
        await userModel.findOneAndDelete({
            username : "iblame_suryaa"
        })

        res.send("user deleted")
    })
     // FIXED (removed duplicate create/send)


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
