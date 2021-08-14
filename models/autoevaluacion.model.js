module.exports = (sequelize, Sequelize, DataTypes) => {
    const Autoevaluacion = sequelize.define(
      "autoevaluacion", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },  
        evidencias: {
          type: DataTypes.STRING(255)
        },
        descripcion_evidencias: {
            type: DataTypes.TEXT('long')
        },
        evidencias: {
            type: DataTypes.JSON
        },
        fortalezas: {
            type: DataTypes.JSON
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
  
    return Autoevaluacion;
  };
  