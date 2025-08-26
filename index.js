const express = require("express");
const methodOverride = require('method-override');
const multer  = require('multer');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();
const systemConfig = require("./config/system.js");

const database = require("./config/database");
const routeClients = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT || 3000; // fallback khi PORT không có

// Method Override
app.use(methodOverride('_method'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Views
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Static files
app.use(express.static(`${__dirname}/public`));

// Flash & Session
app.use(cookieParser('khanhuet'));
app.use(session({
    secret: 'khanhuet', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { maxAge: 60000 }
}));
app.use(flash());

// App locals
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Connect Database trước khi load routes
database.connect();

// Routes
routeClients(app);
routeAdmin(app);

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});


