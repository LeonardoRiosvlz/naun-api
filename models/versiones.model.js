module.exports = (sequelize, Sequelize, DataTypes) => {
    const Versiones = sequelize.define(
      "versione", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        version: {
          type: DataTypes.STRING(15)
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
        status: {
            type: DataTypes.ENUM('Pendiente','Aprobado','Rechazado'),
            defaultValue: 'Pendiente',
        },
        estatus_revisa: {
          type: DataTypes.ENUM('Pendiente','Subido'),
          defaultValue: 'Pendiente',
        },
        estatus_aprueba: {
          type: DataTypes.ENUM('Pendiente','Subido'),
          defaultValue: 'Pendiente',
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Versiones;
  };
  