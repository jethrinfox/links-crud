// Index.js

/*
* Imports
*/
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');


/*
*   Initializations
*/
const app = express()
require('./lib/db')
require('./lib/passport')

/*
*   Settings
*/
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs')


/*
*   Middlewares
*/
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


/*
*   Global Variables
*/
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next()
})


/*
*   Routes
*/
app.use(require('./routes'))
app.use(require('./routes/authentications'))
app.use('/links', require('./routes/links'))


/*
*   Server and public folder initialize
*/
app.use(express.static(path.join(__dirname, 'public')))
app.listen(app.get('port'), () => console.log('Server listening on PORT:', app.get('port')))