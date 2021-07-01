module.exports = (sequelize, Sequelize, DataTypes) => {
    const Vdocumentos = sequelize.define(
      "vdocumentos", // Model name
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
            type: DataTypes.ENUM('Inahabilitado', 'En elaboración','Elaborado','En revisión','Revisión','Revisado', 'En aprobación','Aprobado','Activado','Osboleto',),
            unique: false
        },
        archivo: {
          type: DataTypes.STRING(250)
        },
        firma_elabora: {
          type: DataTypes.STRING(250)
          },
        firma_revisa: {
          type: DataTypes.STRING(250)
        },
        firma_aprueba: {
          type: DataTypes.STRING(250)
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
  
    return Vdocumentos;
  };
  