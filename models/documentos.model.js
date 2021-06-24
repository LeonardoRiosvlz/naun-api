module.exports = (sequelize, Sequelize, DataTypes) => {
    const Documentos = sequelize.define(
      "documentos", // Model name
      {
        // Attributes
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }, 
        creado: {
            type: DataTypes.ENUM('Creado', 'No creado'),
            unique: false
        }, 
        editado: {
            type: DataTypes.ENUM('Creado','Editor','Word'), 
            defaultValue: 'Creado'
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
        elaboracion: {
            type:Sequelize.DATEONLY
        }, 
        revision: {
            type:Sequelize.DATEONLY
        },
        aprobacion: {
            type:Sequelize.DATEONLY
        }, 
        fecha_alerta: {
            type:Sequelize.DATEONLY
        },
        fecha_emicion: {
            type:Sequelize.DATEONLY
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
            type: DataTypes.STRING(150),
            unique: false
        },
        documento: {
            type: DataTypes.JSON 
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
  