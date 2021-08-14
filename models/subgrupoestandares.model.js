module.exports = (sequelize, Sequelize, DataTypes) => {
    const Subgrupoestandares = sequelize.define(
      "subgrupo_estandare", // Model name
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
        desde: {
            type: DataTypes.STRING(5)
        },
        hasta: {
            type: DataTypes.STRING(5) 
        },
        codigo: {
          type: DataTypes.STRING(35)
        },
        descripcion: {
          type: DataTypes.STRING(255)
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
  
    return Subgrupoestandares;
  };
  