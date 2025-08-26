const express = require("express");
const methodOverride = require('method-override')

const multer  = require('multer')
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();
const systemConfig = require("./config/system.js");

const database = require("./config/database");
const routeClients = require("./routes/clients/index.route")
const routeAdmin = require("./routes/admin/index.route")
const app = express();
const port = process.env.PORT; 

app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded : Dành cho nhiều trạng thái 
app.use(bodyParser.urlencoded( { extended: false }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`)); // su dung file static trong public

// Flash
app.use(cookieParser('khanhuet'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End-Flash

// App locals Variables 
app.locals.prefixAdmin = systemConfig.prefixAdmin; // tao ra bien toan cuc nao de file pug nao cung dung duoc

routeClients(app); 
routeAdmin(app);
database.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`http://localhost:${port}`);
}); 


