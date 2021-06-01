module.exports = (sequelize, Sequelize, DataTypes) => {
    const Sedes = sequelize.define(
      "sede", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
        },  
        nombre: {
          type: DataTypes.STRING(40), 
          unique: false
        },
        departamento: {
            type: DataTypes.STRING(30),
            unique: false
          },
        codigo_departamento: {
            type: DataTypes.STRING(30),
            unique: false
        },
        municipio: {
            type: DataTypes.STRING(30),
            unique: false
        },
        codigo_municipio: {
            type: DataTypes.STRING(30),
            unique: false
        },
        codigo_sede: {
            type: DataTypes.STRING(30),
            unique: false
        },
        sede_principal: {
            type: DataTypes.ENUM('Si', 'No'),
            unique: false
        },
        numero_sede: {
            type: DataTypes.STRING(15),
            unique: false
        },
        zona: {
            type: DataTypes.ENUM('Urbana', 'Rural', 'Publica'),
            unique: false
        },
        nombre_gerente: {
          type: DataTypes.STRING(45),
          unique: false
        },
        direccion: {
            type: DataTypes.STRING(150),
            unique: false
        },
        barrio: {
          type: DataTypes.STRING(150),
          unique: false
        },
        centro_poblado: {
            type: DataTypes.STRING(125),
            unique: false
        },        
        fax: {
          type: DataTypes.STRING(25),
          unique: false
        },
        telefono: {
            type: DataTypes.STRING(25),
            unique: false
        },
        email: {
            type: DataTypes.STRING(45),
            unique: false
        },
        nombre_contacto: {
            type: DataTypes.STRING(45),
            unique: false
        },
        cargo: {
            type: DataTypes.STRING(45),
            unique: false
        },
        telefono_contacto: {
            type: DataTypes.STRING(25),
            unique: false
        },
        celular_persona: {
            type: DataTypes.STRING(25),
            unique: false
        },
        celular_corporativo: {
            type: DataTypes.STRING(25),
            unique: false
        },
        email_contacto: {
            type: DataTypes.STRING(25),
            unique: false
        },
        status: {
            type: DataTypes.ENUM('Activo','Inactivo'),
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
  
    return Sedes;
  };
  