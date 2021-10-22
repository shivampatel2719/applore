const express = require('express')
const mongoose = require('mongoose')
var nunjucks  = require('nunjucks');
const session = require('express-session')
const path = require('path');

require('dotenv').config()

mongoose.connect('mongodb+srv://ShivamPatel2719:shivam123@cluster0.8i8lm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
// mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});

const app = express();

const AuthRoute = require('./routes/authroute')
const BusinessRoute = require('./routes/businessroute')

nunjucks.configure(['views/'],{
  autoescape:false,
  express:app
})
console.log(path.join(__dirname,"/dist/applore/"));
app.use(express.static(path.join(__dirname,"/dist/applore/")));

app.use(session({
    secret: "supersecretfile",
    resave: true,
    saveUninitialized: true,
}));

app.use(express.json())
// app.use(express.static('static'))
// app.use('/css',express.static(__dirname+'static/css'))
// app.use('/img',express.static(__dirname+'static/img'))
// app.use('/js',express.static(__dirname+'static/js'))

app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,"/dist/applore/index.html"))
});

app.get('/login',(req,res) => {
  res.sendFile(path.join(__dirname,"/dist/applore/index.html"))
})

app.get('/blogs',(req,res) => {
  res.sendFile(path.join(__dirname,"/dist/applore/index.html"))
})

app.get('/users',(req,res) => {
  res.sendFile(path.join(__dirname,"/dist/applore/index.html"))
})

app.use('/api',AuthRoute)
app.use('/api',BusinessRoute)

app.listen(process.env.PORT || 8080);


