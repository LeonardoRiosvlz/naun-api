module.exports = (sequelize, Sequelize, DataTypes) => {
    const Cargo = sequelize.define(
      "cargo", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING
        },
        canal: {
          type: DataTypes.STRING(25)
        },
        descripcion: {
          type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('Activo', 'Inactivo'),
            unique: false
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
  
    return Cargo;
  };
  