require('dotenv').config();

const express = require("express");
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const systemConfig = require("./config/system.js");
const database = require("./config/database");
const routeClients = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT; // fallback khi PORT không có

require('dotenv').config();

// Method Override
app.use(methodOverride('_method'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Views
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Static files
app.use(express.static(`${__dirname}/public`));

// Flash & Session
app.use(cookieParser('khanhuet'));
app.use(session({
    cookie: { maxAge: 60000 }
}));
app.use(flash());

// Tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End-Tinymce

// App locals
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Connect Database trước khi load routes
database.connect();

// Routes
routeClients(app);
routeAdmin(app);


// Start server
// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });

module.exports = app;


