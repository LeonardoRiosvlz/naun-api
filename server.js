const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const config = require("./app/config/config.js");

const app = express();
const server = require('http').Server(app);

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
//  fin Programacion 
// set port, listen for requests
global.__basedir = __dirname + "/..";
 
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'app/public')));


const PORT = process.env.PORT || 5000;

const servidor =app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(servidor);
global.io = io; //added
io.on('connection', function(socket) {
 
    socket.on('servidor', function(data) {
  
        //io.emit('MESSAGE', data)
        io.to(data.user).emit('cliente', data);
    });
});

module.exports = {

    servidor

}