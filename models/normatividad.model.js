module.exports = (sequelize, Sequelize, DataTypes) => {
    const Normatividad = sequelize.define(
      "normatividad", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        tipo: {
          type: DataTypes.STRING(30)
        },
        nombre: {
            type: DataTypes.STRING(30)
        },
        descripcion: {
          type: DataTypes.STRING
        },
        archivo: {
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
  
    return Normatividad;
  };
  