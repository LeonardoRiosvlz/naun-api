module.exports = (sequelize, Sequelize, DataTypes) => {
    const Procesos = sequelize.define(
      "proceso", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(20)
        },
        objetivos: {
          type: DataTypes.STRING
        },
        tiene_sp: {
          type: DataTypes.ENUM('Si', 'No'),
          unique: false
        },
        codigo: {
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
  
    return Procesos;
  };