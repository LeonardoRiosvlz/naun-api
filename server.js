import express from 'express';
import cors from 'cors';
import path from 'path';


const config = require("./app/config/config.js");

const app = express();


const corsOptions = {
  origin: ""
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true})); 

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
});


// api routes
app.use('/public',express.static(`${__dirname}/app/storage/imgs`));
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/notificacion.routes")(app);
require("./app/routes/clientes.routes")(app);
//  fin Programacion 
// set port, listen for requests
global.__basedir = __dirname + "/..";
 
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'app/public')));

app.set('puerto', process.env.PORT || 4000);
const servidor =app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});



