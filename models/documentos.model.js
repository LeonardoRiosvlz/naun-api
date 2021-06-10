module.exports = (sequelize, Sequelize, DataTypes) => {
    const Documentos = sequelize.define(
      "documentos", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
        }, 
        creado: {
            type: DataTypes.ENUM('Creado', 'No creado'),
            unique: false
        }, 
        nombre: {
           type: DataTypes.STRING(35),
           unique: false
        },
        consecutivo: {
           type: DataTypes.STRING(35),
           unique: false
        },
        version: {
            type: DataTypes.STRING(35),
            unique: false
        }, 
        sub_proceso: {
            type: DataTypes.STRING(5),
            unique: false
        },  
        elaboracion: {
            type:Sequelize.DATE(6) 
        }, 
        revision: {
            type:Sequelize.DATE(6) 
        },
        aprobacion: {
            type:Sequelize.DATE(6) 
        }, 
        fecha_alerta: {
            type:Sequelize.DATE(6) 
        },
        fecha_emicion: {
            type:Sequelize.DATE(6) 
        },  
        intervalo: {
            type: DataTypes.ENUM('12 meses', '6 meses','4 meses','2 meses','1 mes'),  
            unique: false
        },
        status: {
            type: DataTypes.ENUM('Inahabilitado', 'En elaboración','Elaborado','En revisión','Revisión','Revisado', 'En aprobación','Aprobado','Activado','Osboleto',),
            unique: false
        },
        archivo: {
            type: DataTypes.STRING(5),
            unique: false
        },
        normativas: {
            type: DataTypes.JSON 
        },
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Documentos;
  };
  