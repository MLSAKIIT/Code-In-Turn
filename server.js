const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

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

//PORT
const PORT = process.env.PORT || 3000;
//For Static Files
app.set('view engine', 'ejs');
app.use(express.static('public'));

//ROUTES
app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(PORT, (req,res)=>{
    console.log(`Server is live on PORT : ${PORT}....`);
})
