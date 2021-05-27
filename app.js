import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();
// Conexión base de datos
const mongoose = require('mongoose');

//const uri = 'mongodb+srv://dc_user:qZOhZXp6QpBlRfD5@dc.5mr4d.mongodb.net/<dbname>?retryWrites=true&w=majority';
const uri='mongodb://localhost:27017/prueba'
const options = {useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);
// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/public',express.static(`${__dirname}/storage/imgs`));
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 4000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});