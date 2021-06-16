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
            type: DataTypes.STRING(45),
            unique: true
        },
        descripcion: {
            type: DataTypes.STRING(250),
            unique: true
        },
        observaciones: {
            type: DataTypes.STRING(250),
            unique: true
        },
        lugar: {
           type: DataTypes.STRING(150),
           unique: true
        },
        inivitados_externos: {
            type: DataTypes.JSON,
         },
        periodo: {
            type: DataTypes.STRING(20),
            unique: true
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
  