module.exports = (sequelize, Sequelize, DataTypes) => {
    const Periodo = sequelize.define(
      "periodo", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(50)
        },
        status: {
           type: DataTypes.ENUM('Abierto','Cerrado'),
           defaultValue: 'Abierto'
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
  
    return Periodo;
  };
  