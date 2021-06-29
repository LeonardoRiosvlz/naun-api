module.exports = (sequelize, Sequelize, DataTypes) => {
    const Suprocesos = sequelize.define(
      "subproceso", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(40)
        },
        version: {
          type: DataTypes.STRING(25)
        },
        codigo_prefijo: {
          type: DataTypes.STRING(25)
        }, 
        objetivos: {
          type: DataTypes.TEXT('long')
        },
        alcance: {
          type: DataTypes.TEXT('long')
        },
        estado: {
          type: DataTypes.ENUM('Borrador', 'Habilitado'),
          defaultValue: 'Borrador'
        },
        actividades: {
          type: DataTypes.JSON
        },
        recursos: {
          type: DataTypes.JSON
        },
        normativas: {
          type: DataTypes.JSON
        },
        fecha_emicion: {
          type: DataTypes.DATEONLY
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
  
    return Suprocesos;
  };