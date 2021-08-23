const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: 0,
    timezone: '-04:00',
    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.permiso = require("./permiso.model.js")(sequelize, Sequelize, DataTypes);
db.notificacion = require("./notificacion.model.js")(sequelize, Sequelize, DataTypes);
db.cliente = require("./cliente.model.js")(sequelize, Sequelize, DataTypes); 
db.cargos = require("./cargos.model.js")(sequelize, Sequelize, DataTypes);
db.sedes = require("./sedes.model.js")(sequelize, Sequelize, DataTypes);  
db.areas = require("./areas.model.js")(sequelize, Sequelize, DataTypes);
db.perfiles = require("./perfil.model.js")(sequelize, Sequelize, DataTypes);
db.procesos = require("./procesos.model.js")(sequelize, Sequelize, DataTypes);
db.subprocesos = require("./subprocesos.model.js")(sequelize, Sequelize, DataTypes);
db.tipoProceso = require("./tipoProceso.model.js")(sequelize, Sequelize, DataTypes);
db.normativas = require("./normatividad.model.js")(sequelize, Sequelize, DataTypes);
db.tipodocumento = require("./tipodocumento.model.js")(sequelize, Sequelize, DataTypes);
db.documento = require("./documentos.model.js")(sequelize, Sequelize, DataTypes);
db.hdocumento = require("./hdocumentos.model.js")(sequelize, Sequelize, DataTypes);
db.vdocumento = require("./vdocumentos.model.js")(sequelize, Sequelize, DataTypes);
db.formato = require("./formatos.model.js")(sequelize, Sequelize, DataTypes);
db.hformato = require("./hformatos.model.js")(sequelize, Sequelize, DataTypes);
db.vformato = require("./vformatos.model.js")(sequelize, Sequelize, DataTypes);
db.clasificacioneventos = require("./clasificacioneventos.model.js")(sequelize, Sequelize, DataTypes);
db.clasificacionplanes = require("./clasificacionplanes.model.js")(sequelize, Sequelize, DataTypes);
db.eventos = require("./eventos.model.js")(sequelize, Sequelize, DataTypes);
db.responsables = require("./responsables.model.js")(sequelize, Sequelize, DataTypes);
db.comprometidos = require("./comprometidos.model.js")(sequelize, Sequelize, DataTypes);
db.plantillas = require("./plantillas.model.js")(sequelize, Sequelize, DataTypes);
db.subgrupoestandares = require("./subgrupoestandares.model.js")(sequelize, Sequelize, DataTypes);
db.grupoestandares = require("./grupoestandares.model.js")(sequelize, Sequelize, DataTypes);
db.estandares = require("./estandares.model.js")(sequelize, Sequelize, DataTypes);
db.basesae = require("./bases_autoevaluacion.model.js")(sequelize, Sequelize, DataTypes);
db.autoevaluacion = require("./autoevaluacion.model.js")(sequelize, Sequelize, DataTypes);
db.mejoras = require("./mejoras.model.js")(sequelize, Sequelize, DataTypes);
db.periodo = require("./periodo.model.js")(sequelize, Sequelize, DataTypes);
db.planaccion = require("./planaccion.model.js")(sequelize, Sequelize, DataTypes);
db.acciones = require("./acciones.model.js")(sequelize, Sequelize, DataTypes);
db.avancesae = require("./avancesae.model.js")(sequelize, Sequelize, DataTypes);
db.autoevaluacionc = require("./autoevaluacionc.model.js")(sequelize, Sequelize, DataTypes);
db.itemsautoevaluacion = require("./itemsautoevaluacion.model.js")(sequelize, Sequelize, DataTypes);

db.user.hasMany(db.cliente, { foreignKey: 'user_id' });
db.cliente.belongsTo(db.user, { foreignKey: 'user_id' });
 
db.notificacion.belongsTo(db.cargos, { foreignKey: 'uid' });
db.cargos.hasMany(db.notificacion, { foreignKey: 'uid' }); 
db.notificacion.belongsTo(db.user, { foreignKey: 'rid' });
db.user.hasMany(db.notificacion, { foreignKey: 'rid' }); 

db.cliente.hasMany(db.tipodocumento, { foreignKey: 'cliente_id' });
db.tipodocumento.belongsTo(db.cliente, { foreignKey: 'cliente_id' });


db.cliente.hasMany(db.normativas, { foreignKey: 'cliente_id' });
db.normativas.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

///Clientes////
db.cliente.hasMany(db.cargos, { foreignKey: 'cliente_id' });
db.cargos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.user.hasOne(db.cargos, { foreignKey: 'user_id' }); 
db.cargos.belongsTo(db.user, { foreignKey: 'user_id' });
db.cliente.hasMany(db.sedes, { foreignKey: 'cliente_id' });
db.sedes.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.cliente.hasMany(db.areas, { foreignKey: 'cliente_id' });
db.areas.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.cliente.hasMany(db.perfiles, { foreignKey: 'cliente_id' });
db.perfiles.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.user.hasOne(db.perfiles, { foreignKey: 'user_id' });
db.perfiles.belongsTo(db.user, { foreignKey: 'user_id' });
///sedes///


///plantillas//
db.cliente.hasMany(db.plantillas, { foreignKey: 'cliente_id' });
db.plantillas.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
///plantillas//

///procesos///
db.cliente.hasMany(db.tipoProceso, { foreignKey: 'cliente_id' });
db.tipoProceso.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

db.tipoProceso.hasMany(db.procesos, { foreignKey: 'tipo_id' });
db.procesos.belongsTo(db.tipoProceso, { foreignKey: 'tipo_id' });

db.tipoProceso.hasMany(db.subprocesos, { foreignKey: 'tipo_id' });
db.subprocesos.belongsTo(db.tipoProceso, { foreignKey: 'tipo_id' }); 

db.cliente.hasMany(db.procesos, { foreignKey: 'cliente_id' });
db.procesos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

db.user.hasOne(db.procesos, { foreignKey: 'lider_id' }); 
db.procesos.belongsTo(db.user, { foreignKey: 'lider_id' });

db.procesos.hasMany(db.subprocesos, { foreignKey: 'proceso_id' });
db.subprocesos.belongsTo(db.procesos, { foreignKey: 'proceso_id' });

db.user.hasOne(db.subprocesos, { foreignKey: 'lider_id' });
db.subprocesos.belongsTo(db.user, { foreignKey: 'lider_id' });

db.cliente.hasMany(db.subprocesos, { foreignKey: 'cliente_id' });
db.subprocesos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

///procesos/// 


///eventos///
db.cliente.hasMany(db.clasificacioneventos, { foreignKey: 'cliente_id' });
db.clasificacioneventos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.cliente.hasMany(db.clasificacioneventos, { foreignKey: 'cliente_id' });
db.clasificacioneventos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.cliente.hasMany(db.eventos, { foreignKey: 'cliente_id' });
db.eventos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.clasificacioneventos.hasMany(db.eventos, { foreignKey: 'clasificacion_id' });
db.eventos.belongsTo(db.clasificacioneventos, { foreignKey: 'clasificacion_id' });
db.eventos.hasMany(db.responsables, { foreignKey: 'evento_id' });
db.responsables.belongsTo(db.eventos, { foreignKey: 'evento_id' });
db.cargos.hasMany(db.responsables, { foreignKey: 'cargo_id' });
db.responsables.belongsTo(db.cargos, { foreignKey: 'cargo_id' });

db.eventos.hasMany(db.comprometidos, { foreignKey: 'evento_id',onDelete: 'CASCADE' });
db.comprometidos.belongsTo(db.eventos, { foreignKey: 'evento_id',onDelete: 'CASCADE', });
db.cargos.hasMany(db.comprometidos, { foreignKey: 'cargo_id',onDelete: 'CASCADE' });
db.comprometidos.belongsTo(db.cargos, { foreignKey: 'cargo_id', onDelete: 'CASCADE',});
///eventos///

  


///planes///
db.cliente.hasMany(db.clasificacionplanes, { foreignKey: 'cliente_id' });
db.clasificacionplanes.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.cliente.hasMany(db.planaccion, { foreignKey: 'cliente_id' });
db.planaccion.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.basesae.hasMany(db.planaccion, { foreignKey: 'base_id' ,onDelete: 'CASCADE'}); 
db.planaccion.belongsTo(db.basesae, { foreignKey: 'base_id',onDelete: 'CASCADE' });
db.clasificacionplanes.hasMany(db.planaccion, { foreignKey: 'clasificacion_id'});
db.planaccion.belongsTo(db.clasificacionplanes, { foreignKey: 'clasificacion_id'});
db.planaccion.hasMany(db.mejoras, { foreignKey: 'plan_id' });
db.mejoras.belongsTo(db.planaccion, { foreignKey: 'plan_id' });
///planes///



/////auto evaluacion cauntitativa////
db.cliente.hasMany(db.autoevaluacionc, { foreignKey: 'cliente_id' });
db.autoevaluacionc.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.periodo.hasMany(db.autoevaluacionc, { foreignKey: 'periodo_id' });
db.autoevaluacionc.belongsTo(db.periodo, { foreignKey: 'periodo_id' });
db.autoevaluacionc.hasMany(db.itemsautoevaluacion, { foreignKey: 'autoevaluacionc_id' });
db.itemsautoevaluacion.belongsTo(db.autoevaluacionc, { foreignKey: 'autoevaluacionc_id' });
/////auto evaluacion cauntitativa////



///Acciones/// 
db.cargos.hasMany(db.acciones, { as: 'Responsable_a', foreignKey: 'responsable_id' });
db.acciones.belongsTo(db.cargos, { as: 'Responsable_a', foreignKey: 'responsable_id' }); 
db.cliente.hasMany(db.acciones, { foreignKey: 'cliente_id' });
db.acciones.belongsTo(db.cliente, { foreignKey: 'cliente_id' });
db.clasificacioneventos.hasMany(db.acciones, { foreignKey: 'clasificacion_id' });
db.acciones.belongsTo(db.clasificacioneventos, { foreignKey: 'clasificacion_id' });
db.procesos.hasMany(db.acciones, { foreignKey: 'proceso_id' });
db.acciones.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
db.subprocesos.hasMany(db.acciones, { foreignKey: 'subproceso_id' });
db.acciones.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
db.mejoras.hasMany(db.acciones, { foreignKey: 'mejora_id' });
db.acciones.belongsTo(db.mejoras, { foreignKey: 'mejora_id' });
db.acciones.hasMany(db.avancesae, { foreignKey: 'accion_id' });
db.avancesae.belongsTo(db.acciones, { foreignKey: 'accion_id' });
///Acciones///


//documentos//
db.tipodocumento.hasMany(db.documento, { foreignKey: 'tipo_id' });
db.documento.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });
db.tipodocumento.hasMany(db.vdocumento, { foreignKey: 'tipo_id' });
db.vdocumento.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });
db.tipodocumento.hasMany(db.hdocumento, { foreignKey: 'tipo_id' });
db.hdocumento.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });

db.procesos.hasMany(db.documento, { foreignKey: 'proceso_id' });
db.documento.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
db.procesos.hasMany(db.vdocumento, { foreignKey: 'proceso_id' });
db.vdocumento.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
db.procesos.hasMany(db.hdocumento, { foreignKey: 'proceso_id' });
db.hdocumento.belongsTo(db.procesos, { foreignKey: 'proceso_id' });

db.subprocesos.hasMany(db.documento, { foreignKey: 'subproceso_id' });
db.documento.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
db.subprocesos.hasMany(db.vdocumento, { foreignKey: 'subproceso_id' });
db.vdocumento.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
db.subprocesos.hasMany(db.hdocumento, { foreignKey: 'subproceso_id' });
db.hdocumento.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
 
db.cliente.hasMany(db.documento, { foreignKey: 'cliente_id' });
db.documento.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

db.sedes.hasMany(db.documento, { foreignKey: 'sedes_id' }); 
db.documento.belongsTo(db.sedes, { foreignKey: 'sedes_id' });
db.sedes.hasMany(db.vdocumento, { foreignKey: 'sedes_id' }); 
db.vdocumento.belongsTo(db.sedes, { foreignKey: 'sedes_id' });
db.sedes.hasMany(db.hdocumento, { foreignKey: 'sedes_id' }); 
db.hdocumento.belongsTo(db.sedes, { foreignKey: 'sedes_id' });

db.documento.hasMany(db.vdocumento, { foreignKey: 'documento_id', onDelete: 'CASCADE' });
db.vdocumento.belongsTo(db.documento, { foreignKey: 'documento_id',onDelete: 'CASCADE' }); 

db.documento.hasMany(db.hdocumento, { foreignKey: 'documento_id', onDelete: 'CASCADE' });
db.hdocumento.belongsTo(db.documento, { foreignKey: 'documento_id',onDelete: 'CASCADE' }); 

db.cargos.hasMany(db.hdocumento, { as: 'Elabora_h', foreignKey: 'elabora_h_id' });
db.cargos.hasMany(db.hdocumento, { as: 'Aprueba_h', foreignKey: 'aprueba_h_id' });
db.cargos.hasMany(db.hdocumento, { as: 'Revisa_h', foreignKey: 'revisa_h_id' });
db.hdocumento.belongsTo(db.cargos, { as: 'Revisa_h', foreignKey: 'revisa_h_id' });
db.hdocumento.belongsTo(db.cargos, { as: 'Elabora_h', foreignKey: 'elabora_h_id' });
db.hdocumento.belongsTo(db.cargos, { as: 'Aprueba_h', foreignKey: 'aprueba_h_id' });

db.cargos.hasMany(db.vdocumento, { as: 'Elabora_v', foreignKey: 'elabora_v_id' });
db.cargos.hasMany(db.vdocumento, { as: 'Aprueba_v', foreignKey: 'aprueba_v_id' });
db.cargos.hasMany(db.vdocumento, { as: 'Revisa_v', foreignKey: 'revisa_v_id' });
db.vdocumento.belongsTo(db.cargos, { as: 'Revisa_v', foreignKey: 'revisa_v_id' });
db.vdocumento.belongsTo(db.cargos, { as: 'Elabora_v', foreignKey: 'elabora_v_id' });
db.vdocumento.belongsTo(db.cargos, { as: 'Aprueba_v', foreignKey: 'aprueba_v_id' });

db.cargos.hasMany(db.documento, { as: 'Elabora', foreignKey: 'elabora_id' });
db.cargos.hasMany(db.documento, { as: 'Aprueba', foreignKey: 'aprueba_id' });
db.cargos.hasMany(db.documento, { as: 'Revisa', foreignKey: 'revisa_id' });
db.documento.belongsTo(db.cargos, { as: 'Revisa', foreignKey: 'revisa_id' });
db.documento.belongsTo(db.cargos, { as: 'Elabora', foreignKey: 'elabora_id' });
db.documento.belongsTo(db.cargos, { as: 'Aprueba', foreignKey: 'aprueba_id' });

db.user.hasMany(db.documento, { as: 'Habilita', foreignKey: 'habilita_id' });
db.documento.belongsTo(db.user, { as: 'Habilita', foreignKey: 'habilita_id' });
db.user.hasMany(db.vdocumento, { as: 'Habilita_v', foreignKey: 'habilita_id' }); 
db.vdocumento.belongsTo(db.user, { as: 'Habilita_v', foreignKey: 'habilita_id' });
db.user.hasMany(db.hdocumento, { as: 'Habilita_h', foreignKey: 'habilita_id' });
db.hdocumento.belongsTo(db.user, { as: 'Habilita_h', foreignKey: 'habilita_id' });
//documentos//




//formatos//
db.tipodocumento.hasMany(db.formato, { foreignKey: 'tipo_id' });
db.formato.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });
db.tipodocumento.hasMany(db.vformato, { foreignKey: 'tipo_id' });
db.vdocumento.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });
db.tipodocumento.hasMany(db.hdocumento, { foreignKey: 'tipo_id' });
db.hdocumento.belongsTo(db.tipodocumento, { foreignKey: 'tipo_id' });

db.procesos.hasMany(db.formato, { foreignKey: 'proceso_id' });
db.formato.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
db.procesos.hasMany(db.vformato, { foreignKey: 'proceso_id' });
db.vformato.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
db.procesos.hasMany(db.hformato, { foreignKey: 'proceso_id' });
db.hformato.belongsTo(db.procesos, { foreignKey: 'proceso_id' });

db.subprocesos.hasMany(db.formato, { foreignKey: 'subproceso_id' });
db.formato.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
db.subprocesos.hasMany(db.vformato, { foreignKey: 'subproceso_id' });
db.vformato.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });
db.subprocesos.hasMany(db.hformato, { foreignKey: 'subproceso_id' });
db.hformato.belongsTo(db.subprocesos, { foreignKey: 'subproceso_id' });

db.cliente.hasMany(db.formato, { foreignKey: 'cliente_id' });
db.formato.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

db.sedes.hasMany(db.formato, { foreignKey: 'sedes_id' }); 
db.formato.belongsTo(db.sedes, { foreignKey: 'sedes_id' });
db.sedes.hasMany(db.vformato, { foreignKey: 'sedes_id' }); 
db.vformato.belongsTo(db.sedes, { foreignKey: 'sedes_id' });
db.sedes.hasMany(db.hformato, { foreignKey: 'sedes_id' }); 
db.hformato.belongsTo(db.sedes, { foreignKey: 'sedes_id' });

db.formato.hasMany(db.vformato, { foreignKey: 'documento_id', onDelete: 'CASCADE' });
db.vformato.belongsTo(db.formato, { foreignKey: 'documento_id',onDelete: 'CASCADE' }); 

db.formato.hasMany(db.hformato, { foreignKey: 'documento_id', onDelete: 'CASCADE' });
db.hformato.belongsTo(db.formato, { foreignKey: 'documento_id',onDelete: 'CASCADE' }); 

db.cargos.hasMany(db.hformato, { as: 'Elabora_f_h', foreignKey: 'elabora_h_id' });
db.cargos.hasMany(db.hformato, { as: 'Aprueba_f_h', foreignKey: 'aprueba_h_id' });
db.cargos.hasMany(db.hformato, { as: 'Revisa_f_h', foreignKey: 'revisa_h_id' });
db.hformato.belongsTo(db.cargos, { as: 'Revisa_f_h', foreignKey: 'revisa_h_id' });
db.hformato.belongsTo(db.cargos, { as: 'Elabora_f_h', foreignKey: 'elabora_h_id' });
db.hformato.belongsTo(db.cargos, { as: 'Aprueba_f_h', foreignKey: 'aprueba_h_id' });

db.cargos.hasMany(db.vformato, { as: 'Elabora_f_v', foreignKey: 'elabora_v_id' });
db.cargos.hasMany(db.vformato, { as: 'Aprueba_f_v', foreignKey: 'aprueba_v_id' });
db.cargos.hasMany(db.vformato, { as: 'Revisa_f_v', foreignKey: 'revisa_v_id' });
db.vformato.belongsTo(db.cargos, { as: 'Revisa_f_v', foreignKey: 'revisa_v_id' });
db.vformato.belongsTo(db.cargos, { as: 'Elabora_f_v', foreignKey: 'elabora_v_id' });
db.vformato.belongsTo(db.cargos, { as: 'Aprueba_f_v', foreignKey: 'aprueba_v_id' });

db.cargos.hasMany(db.formato, { as: 'Elabora_f', foreignKey: 'elabora_id' });
db.cargos.hasMany(db.formato, { as: 'Aprueba_f', foreignKey: 'aprueba_id' });
db.cargos.hasMany(db.formato, { as: 'Revisa_f', foreignKey: 'revisa_id' });
db.formato.belongsTo(db.cargos, { as: 'Revisa_f', foreignKey: 'revisa_id' });
db.formato.belongsTo(db.cargos, { as: 'Elabora_f', foreignKey: 'elabora_id' });
db.formato.belongsTo(db.cargos, { as: 'Aprueba_f', foreignKey: 'aprueba_id' });

db.user.hasMany(db.formato, { as: 'Habilita_f', foreignKey: 'habilita_id' });
db.formato.belongsTo(db.user, { as: 'Habilita_f', foreignKey: 'habilita_id' });
db.user.hasMany(db.vformato, { as: 'Habilita_f_v', foreignKey: 'habilita_id' }); 
db.vformato.belongsTo(db.user, { as: 'Habilita_f_v', foreignKey: 'habilita_id' });
db.user.hasMany(db.hformato, { as: 'Habilita_f_h', foreignKey: 'habilita_id' });
db.hformato.belongsTo(db.user, { as: 'Habilita_f_h', foreignKey: 'habilita_id' });
//documentos//





///sedes///
db.cliente.hasMany(db.procesos, { foreignKey: 'cliente_id' });
db.procesos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });


///estandares///
db.grupoestandares.hasMany(db.estandares, { foreignKey: 'grupo_id' , onDelete: 'CASCADE'});
db.estandares.belongsTo(db.grupoestandares, { foreignKey: 'grupo_id' , onDelete: 'CASCADE'});
db.grupoestandares.hasMany(db.subgrupoestandares, { foreignKey: 'grupo_id', onDelete: 'CASCADE'});
db.subgrupoestandares.belongsTo(db.grupoestandares, { foreignKey: 'grupo_id' , onDelete: 'CASCADE'});
db.subgrupoestandares.hasMany(db.estandares, { foreignKey: 'subgrupo_id' , onDelete: 'CASCADE'});
db.estandares.belongsTo(db.subgrupoestandares, { foreignKey: 'subgrupo_id' , onDelete: 'CASCADE'});
///estandares///


///base auto evalucacion///
db.cliente.hasMany(db.basesae, { foreignKey: 'cliente_id' , onDelete: 'CASCADE'});
db.basesae.belongsTo(db.cliente, { foreignKey: 'cliente_id' , onDelete: 'CASCADE'});
db.periodo.hasMany(db.basesae, { foreignKey: 'periodo_id' , onDelete: 'CASCADE'});
db.basesae.belongsTo(db.periodo, { foreignKey: 'periodo_id', onDelete: 'CASCADE' });
///base auto evalucacion///

//autoevalucacion///
db.cliente.hasMany(db.autoevaluacion, { foreignKey: 'cliente_id' , onDelete: 'CASCADE'});
db.autoevaluacion.belongsTo(db.cliente, { foreignKey: 'cliente_id' , onDelete: 'CASCADE'});
db.cliente.hasMany(db.periodo, { foreignKey: 'cliente_id', onDelete: 'CASCADE' });
db.periodo.belongsTo(db.cliente, { foreignKey: 'cliente_id' , onDelete: 'CASCADE'});
db.basesae.hasMany(db.autoevaluacion, { foreignKey: 'base_id', onDelete: 'CASCADE' });  
db.autoevaluacion.belongsTo(db.basesae, { foreignKey: 'base_id' , onDelete: 'CASCADE'});
db.estandares.hasMany(db.autoevaluacion, { foreignKey: 'estandar_id', onDelete: 'CASCADE' });
db.autoevaluacion.belongsTo(db.estandares, { foreignKey: 'estandar_id', onDelete: 'CASCADE' });
db.periodo.hasMany(db.autoevaluacion, { foreignKey: 'periodo_id', onDelete: 'CASCADE' });
db.autoevaluacion.belongsTo(db.periodo, { foreignKey: 'periodo_id', onDelete: 'CASCADE' });
db.grupoestandares.hasMany(db.autoevaluacion, { foreignKey: 'grupo_id', onDelete: 'CASCADE' });
db.autoevaluacion.belongsTo(db.grupoestandares, { foreignKey: 'grupo_id', onDelete: 'CASCADE' });
db.subgrupoestandares.hasMany(db.autoevaluacion, { foreignKey: 'subgrupo_id', onDelete: 'CASCADE' });
db.autoevaluacion.belongsTo(db.subgrupoestandares, { foreignKey: 'subgrupo_id', onDelete: 'CASCADE' });
db.autoevaluacion.hasMany(db.mejoras, { foreignKey: 'autoevaluacion_id', onDelete: 'CASCADE' });
db.mejoras.belongsTo(db.autoevaluacion, { foreignKey: 'autoevaluacion_id', onDelete: 'CASCADE' });
//autoevalucacion///


//persmisos//
db.user.hasMany(db.permiso, { foreignKey: 'user_id' });
db.permiso.belongsTo(db.user, { foreignKey: 'user_id' });
db.procesos.hasMany(db.permiso, { foreignKey: 'proceso_id' });
db.permiso.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
//permisos//
db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
