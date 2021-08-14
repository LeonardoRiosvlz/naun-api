module.exports = (sequelize, Sequelize, DataTypes) => {
    const Mejoras = sequelize.define(
      "mejoras", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('SIN PRIORIZAR', 'PRIORIZADA', 'PROGRAMADA'),
            defaultValue: 'SIN PRIORIZAR'
        },
        oportunidad_mejoras: {
            type: DataTypes.JSON
        },
        puntaje_riesgo: {
            type: DataTypes.STRING(15)
        },
        puntaje_costo: {
            type: DataTypes.STRING(15)
        },
        puntaje_volumen: {
            type: DataTypes.STRING(15)
        },
        total: {
          type: DataTypes.STRING(15)
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
  
    return Mejoras;
  };
  