import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const {appConfig}=  require('../config')

const notaSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  imgUrl: String,
  gallery:Array,
  show:{type: Boolean, default: false},
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}
});

notaSchema.methods.setImgUrl= function setImgUrl(filename){
    const {host,port}=appConfig
    this.imgUrl= `${host}:${port}/public/${filename}`
}

// Convertir a modelo
const Nota = mongoose.model('Nota', notaSchema);

export default Nota;