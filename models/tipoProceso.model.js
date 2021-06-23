module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tipoproceso = sequelize.define(
      "tipo_proceso", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(150)
        },
        descripcion: {
          type: DataTypes.TEXT('long')
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
  
    return Tipoproceso;
  };