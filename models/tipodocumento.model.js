module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tipodocuemento = sequelize.define(
      "tipodocumento", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
        },   
        nombre: {
          type: DataTypes.STRING(70), 
          unique: false
        },
        prefijo: {
           type: DataTypes.STRING(10), 
           unique: false
        },
        descripcion: {
           type: DataTypes.STRING,
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
  
    return Tipodocuemento;
  };
  