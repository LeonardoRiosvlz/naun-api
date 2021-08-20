module.exports = (sequelize, Sequelize, DataTypes) => {
    const Avancesas = sequelize.define(
      "avancesas", // Model name
      {
        // Model attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion_evidencias: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
            unique: false
        },
        descripcion_avances: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
            unique: false
        },
        evidencias: {
            type: DataTypes.JSON
        },
        status: {
            type: DataTypes.ENUM('NO INICIADA','EN DESARROLLLO','REALIZADA'),
            defaultValue: 'NO INICIADA',
            unique: false
        }, 
        fecha_verificacion: {
            allowNull: true,
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.INTEGER(5)
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
  
    return Avancesas;
  };
  