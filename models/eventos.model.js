module.exports = (sequelize, Sequelize, DataTypes) => {
    const Eventos = sequelize.define(
      "evento", // Model name
      {
        // Model attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true  
        },
        nombre: {
            type: DataTypes.STRING(105),
            allowNull: true,
            unique: false
        },
        descripcion: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
            unique: false
        },
        observaciones: {
            type: DataTypes.STRING(250),
            allowNull: true,
            unique: false
        },
        lugar: {
           type: DataTypes.STRING(150),
           allowNull: true,
           unique: false
        },
        inivitados_externos: {
            allowNull: true,
            type: DataTypes.JSON,
         },
        periodo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: false
        },
        status: {
            type: DataTypes.ENUM('Creada','Programado','Cumplido','No realizado'),
            defaultValue: 'Creada',
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
  
    return Eventos;
  };
  