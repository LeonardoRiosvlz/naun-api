module.exports = (sequelize, Sequelize, DataTypes) => {
    const Acciones = sequelize.define(
      "acciones", // Model name
      {
        // Model attributes
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true 
        },
        descripcion_accion: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
            unique: false
        },
        evidencia_solicitada: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
            unique: false
        },
        status: {
            type: DataTypes.ENUM('NO INICIADA','EN DESARROLLLO','REALIZADA'),
            defaultValue: 'NO INICIADA',
            unique: false
        }, 
        fecha_programada: {
            allowNull: true,
            type: DataTypes.DATE
        },
        fecha_ejecucion: {
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
  
    return Acciones;
  };
  