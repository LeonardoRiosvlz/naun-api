module.exports = (sequelize, Sequelize, DataTypes) => {
    const Itemsautoevaluacion = sequelize.define(
      "itemsautoevaluacion", // Model name
      {
        // Model attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        aplicabilidad: {
            type: DataTypes.ENUM('NO APLICA','APLICA'),
            defaultValue: 'NO APLICA',
            unique: false
        }, 
        enfoque_sistematico: {
            type: DataTypes.INTEGER(5)
        },
        enfoque_proactivo: {
            type: DataTypes.INTEGER(5)
        },
        enfoque_em: {
            type: DataTypes.INTEGER(5)
        },
        despliegue_institucional: {
            type: DataTypes.INTEGER(5)
        },
        apropiacion_cie: {
            type: DataTypes.INTEGER(5)
        },
        pertinencia: {
            type: DataTypes.INTEGER(5)
        },
        consistencia: {
            type: DataTypes.INTEGER(5)
        },        
        avance_mediacion: {
            type: DataTypes.INTEGER(5)
        },
        tendencia: {
            type: DataTypes.INTEGER(5)
        },
        comparacion: {
            type: DataTypes.INTEGER(5)
        },
        promedio: {
            type: DataTypes.FLOAT(10)
        },
        total: {
            type: DataTypes.INTEGER(10)
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
  
    return Itemsautoevaluacion;
  };
  