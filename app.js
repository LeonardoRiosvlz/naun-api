import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// database
const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
});


app.use('/public',express.static(`${__dirname}/storage/imgs`));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/clientes.routes'));
app.use('/api', require('./routes/cargos.routes'));
app.use('/api', require('./routes/sedes.routes'));
app.use('/api', require('./routes/areas.routes'));
app.use('/api', require('./routes/notificacion.routes'));
app.use('/api', require('./routes/perfil.routes'));
app.use('/api', require('./routes/procesos.routes'));
app.use('/api', require('./routes/permisos.routes'));
app.use('/api', require('./routes/tipoprocesos.routes'));
app.use('/api', require('./routes/subprocesos.routes'));
app.use('/api', require('./routes/normatividad.routes'));
app.use('/api', require('./routes/tipodocumentos.routes'));
app.use('/api', require('./routes/documento.routes'));
app.use('/api', require('./routes/formatos.routes'));
app.use('/api', require('./routes/vformatos.routes'));
app.use('/api', require('./routes/vdocumento.routes'));
app.use('/api', require('./routes/clasificacioneventos.routes'));
app.use('/api', require('./routes/clasificacionplanes.routes'));
app.use('/api', require('./routes/planaccion.routes'));
app.use('/api', require('./routes/plantillas.routes'));
app.use('/api', require('./routes/eventos.routes'));
app.use('/api', require('./routes/grupoestandares.routes'));
app.use('/api', require('./routes/subgrupoestandares.routes'));
app.use('/api', require('./routes/estandares.routes'));
app.use('/api', require('./routes/basesau.routes'));
app.use('/api', require('./routes/autoevaluacion.routes'));
app.use('/api', require('./routes/autoevaluacionc.routes'));
app.use('/api', require('./routes/periodo.routes'));
app.use('/api', require('./routes/mejoras.routes'));
app.use('/api', require('./routes/acciones.routes'));
app.use('/api', require('./routes/avancesae.routes'));
app.use('/api', require('./routes/itemsautoevaluacionc.routes'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 4000);
const servidor = app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});

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
