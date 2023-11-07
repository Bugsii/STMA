const express = require('express');
const app = express();
const path = require('path'); // for file paths
const dotenv = require('dotenv'); // for environment variables
const cookieParser = require('cookie-parser'); // for cookies
dotenv.config(); // loads environment variables from a .env file into process.env

app.use(express.json()); // parses incoming requests with JSON payloads

app.set('view engine', 'ejs'); // handles the template for the webpages
app.set('views', path.join(__dirname, 'views')); // sets views directory for view templates
app.use(express.static(path.join(__dirname, 'public'))); // sets public directory for static files
app.use(express.urlencoded({ extended: true })); //parses in req.body

app.use(cookieParser()); // parses incoming requests with cookies

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Define routes
app.use('/', require('./routes/userRoutes')); 
app.use('/auth', require('./routes/auth'));

app.listen(3000, ()=> {
    console.log('Running on http://localhost:3000')

})