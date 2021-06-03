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

db.user.hasMany(db.cliente, { foreignKey: 'user_id' });
db.cliente.belongsTo(db.user, { foreignKey: 'user_id' });
 
db.notificacion.belongsTo(db.user, { foreignKey: 'uid' });
db.user.hasMany(db.notificacion, { foreignKey: 'uid' });

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


///procesos///
db.cliente.hasMany(db.tipoProceso, { foreignKey: 'cliente_id' });
db.tipoProceso.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

db.tipoProceso.hasMany(db.procesos, { foreignKey: 'tipo_id' });
db.procesos.belongsTo(db.tipoProceso, { foreignKey: 'tipo_id' });

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

///sedes///
db.cliente.hasMany(db.procesos, { foreignKey: 'cliente_id' });
db.procesos.belongsTo(db.cliente, { foreignKey: 'cliente_id' });

//persmisos//
db.user.hasMany(db.permiso, { foreignKey: 'user_id' });
db.permiso.belongsTo(db.user, { foreignKey: 'user_id' });
db.procesos.hasMany(db.permiso, { foreignKey: 'proceso_id' });
db.permiso.belongsTo(db.procesos, { foreignKey: 'proceso_id' });
//permisos//
db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
