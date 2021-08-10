module.exports = (sequelize, Sequelize, DataTypes) => {
    const Vformatos = sequelize.define(
      "vformatos", // Model name
      {
        // Attributes
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }, 
        diagramas: {
            type: DataTypes.ENUM('Si','No'),
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
        nombre_elabora: {
            type: DataTypes.STRING(35),
            unique: false
        },
        nombre_revisa: {
            type: DataTypes.STRING(35),
            unique: false
        },
        nombre_aprueba: {
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
            type: DataTypes.ENUM('Inhabilitado', 'En elaboración','Elaborado','En revisión','Revisión','Revisado', 'En aprobación','Aprobado','Activado','Obsoleto',),
            defaultValue: 'En elaboración'
        },
        status_elaboracion: {
            type: DataTypes.ENUM('Pendiente', 'En elaboración','Elaborado'),
            defaultValue: 'Pendiente'
        },
        observaciones_elaboracion: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        status_revision: {
            type: DataTypes.ENUM('Pendiente','Aprobado','Rechazado'),
            defaultValue: 'Pendiente'
        },
        observaciones_revision: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        status_aprobacion: {
            type: DataTypes.ENUM('Pendiente','Aprobado','Rechazado'),
            defaultValue: 'Pendiente'
        },
        observaciones_aprobacion: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        archivo_texto: {
            type: DataTypes.JSON
        },
        anexos: {
            type: DataTypes.JSON
        },
        diagramas: {
          type: DataTypes.STRING(250)
        },
        observaciones_documentos: {
            type: DataTypes.TEXT('long')
        },
        observaciones_diagramas: {
            type: DataTypes.TEXT('long')
        },
        observaciones_version: {
            type: DataTypes.TEXT('long'),
            unique: false
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
  
    return Vformatos;
  };
  