module.exports = (sequelize, Sequelize, DataTypes) => {
    const Perfil = sequelize.define(
      "perfil", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
        },  
        foto: {
            type: DataTypes.STRING(70), 
            unique: false
        }, 
        nombre: {
          type: DataTypes.STRING(70), 
          unique: false
        },
        tipo: {
          type: DataTypes.ENUM('Lider','Consultor','Colaborador'),
          unique: false
        },
        email: {
          type: DataTypes.STRING(45),
          unique: false
        },
        cedula: {
          type: DataTypes.STRING(30),
          unique: false
        },
        telefono: {
            type: DataTypes.STRING(30),
            unique: false
        },
        celular_personal: {
            type: DataTypes.STRING(30),
            unique: false
        },
        celular_corporativo: {
              type: DataTypes.STRING(30),
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
  
    return Perfil;
  };
  