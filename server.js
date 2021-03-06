const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//PORT
const PORT = process.env.PORT || 3000;
// DataBase Connection
mongoose.connect('mongodb://localhost:27017/testlogin', //DataBase Connection URL will be Updated later.
 { useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}, ()=>{
    console.log(`DataBase Connected!`);
});

/**
 * -------- Import Db Models Here. ---------
 */
const User = require('./model/user');

//For Static Files
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json()); //Middleware for express.

//ROUTES
app.get('/', (req,res)=>{
    res.render('index');
})
app.get('/register', (req,res)=>{
    res.render('register');
})


// User Registration
app.post('/register', async (req,res)=>{
    console.log(`post register..`);
    console.log(`User Input : `);
    console.log(req.body);
    const { username, password : plainTextPassword , email } = req.body;
    //Basic Validations
    if(!username || typeof username !== 'string'){
        return res.json({status : 'error', error : 'Invalid Username.'});
    }
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
         return res.json({status : 'error', error : 'Invalid password.'});
    }
    if(!email || typeof email !== 'string' || !email.includes("@", 1)){
        return res.json({status : 'error', error : 'Invalid email id.'});
    }
    if(plainTextPassword.length < 7){
         return res.json({status : 'error', error : 'Password must be of atleast 8 characters.'});
    }

    const password = await bcrypt.hash(plainTextPassword,10);
    try{
        const response = await User.create({
            username,
            password, //storing the hashed password.
            email
        })
        console.log("User Created Successfully : ",response);
    }catch(error){
        if(error.code === 11000){
            return res.json({status : 'error', error : 'Username already taken.'});
        }
        console.log("Something went wrong while saving the User.. : ",error);
        throw error;
    }

    res.json({ status : 'ok'});
})

app.listen(PORT, (req,res)=>{
    console.log(`Server is live on PORT : ${PORT}....`);
})
module.exports = {app: app};

require('./js/user-dashboard');
