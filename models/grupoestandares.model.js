module.exports = (sequelize, Sequelize, DataTypes) => {
    const Grupoestandares = sequelize.define(
      "grupo_estandare", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(150)
        },
        codigo: {
            type: DataTypes.STRING(50)
        },
        descripcion: {
          type: DataTypes.STRING
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
  
    return Grupoestandares;
  };
  