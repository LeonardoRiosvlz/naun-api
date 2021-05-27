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

db.user.hasMany(db.cliente, { foreignKey: 'user_id' });
db.cliente.belongsTo(db.user, { foreignKey: 'user_id' });
 
db.notificacion.belongsTo(db.user, { foreignKey: 'uid' });
db.user.hasMany(db.notificacion, { foreignKey: 'uid' });


db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
