module.exports = (sequelize, Sequelize, DataTypes) => {
    const Plantillas = sequelize.define(
      "plantilla", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING(100)
        },
        descripcion: {
          type: DataTypes.STRING(100)
        },
        status: {
            type: DataTypes.ENUM('Activo', 'Inactivo'),
            unique: false
        },
        documento: {
            type: DataTypes.JSON
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
  
    return Plantillas;
  };
  