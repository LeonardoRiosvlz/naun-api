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
  