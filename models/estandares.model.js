module.exports = (sequelize, Sequelize, DataTypes) => {
    const Estandares = sequelize.define(
      "estandare", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        numero: {
          type: DataTypes.STRING(150)
        },
        codigo: {
            type: DataTypes.STRING(150)
        },
        descripcion: {
          type: DataTypes.TEXT('long')
        },
        criterios: {
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
  
    return Estandares;
  };
  