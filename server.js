const express = require('express');
const exphbs = require('express-handlebars');
const connectDb = require('./config/dB');
const cookieParser = require('cookie-parser');
const path = require('path');
const publicPath = path.join(__dirname, '/public'); // to link css files in public folder to handlebars
const app = express();
const PORT = process.env.PORT || 3000; // set port

app.use('/', express.static(publicPath)); // to link css files in public folder to handlebars
app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json({ extended: false }));

connectDb(); //  connect database
app.get('/login', (req, res) => res.render('login'));

app.get('/', (req, res) => res.render('home')); // default route to app
app.get('/login', (req, res) => res.render('login'));
app.get('/sign-up', (req, res) => res.render('createAccount'));
app.get('/manager', (req, res) => res.render('manager'));
// Use public folder to link with css files

//define routes
app.use('/business', require('./routes/account'));
app.use('/business', require('./routes/login'));
app.use('/business', require('./routes/auth'));
app.use('/business', require('./routes/logout'));
app.use('/addCustomer', require('./routes/addCustomer'));
app.use('/business', require('./routes/mngCust'));
app.use('/addCustomer', require('./routes/addCustomer'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
