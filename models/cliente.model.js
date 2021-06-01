module.exports = (sequelize, Sequelize, DataTypes) => {
    const Cliente = sequelize.define(
      "cliente", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
        },  
        logo: {
          type: DataTypes.STRING(150), 
          unique: false
        },
        tipo_cliente: {
            type: DataTypes.ENUM('Persona jurídica', 'Profesional', 'Independiente'),
            unique: false
        },
        tipo_documento: {
            type: DataTypes.ENUM('Nit', 'Cedula ciudadanía', 'Cedula extranjería'),
            unique: false
        },
        numero_documento: {
          type: DataTypes.STRING(25),
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
        naturaleza_juridica: {
            type: DataTypes.ENUM('Privada', 'Mixta', 'Publica'),
            unique: false
        },
        nombre_prestador: {
          type: DataTypes.STRING(25),
          unique: false
        },
        nombre_prestador: {
            type: DataTypes.STRING(25),
            unique: false
        },        
        codigo_prestador: {
          type: DataTypes.STRING(25),
          unique: false
        },
        codigo: {
          type: DataTypes.STRING,
          unique: false
        },
        clase_prestador: {
          type: DataTypes.STRING(150),
          unique: false
        },
        ese: {
          type: DataTypes.ENUM('Si', 'No'),
          unique: false
        },
        direccion: {
          type: DataTypes.STRING(255),
          unique: false
        },
        telefono: {
          type: DataTypes.STRING(15),
          unique: false
        },
        fax: {
          type: DataTypes.STRING(15),
          unique: false
        },
        celular: {
          type: DataTypes.STRING(15),
          unique: false
        },
        email: {
          type: DataTypes.STRING(25),
          unique: true
        },
        razon_social: {
          type: DataTypes.STRING(255),
          unique: false
        },
        representante_legal: {
          type: DataTypes.STRING(255),
          unique: false
        },
        numero_sede: {
          type: DataTypes.STRING(5),
          unique: false
        },    
        nivel_atencion: {
          type: DataTypes.ENUM('1','2','3','4'),
          unique: false
        },
        caracter_territorial: {
          type: DataTypes.ENUM('Nacional','Deparatamental','Distrital','Municipal','Indigena'),
          unique: false
        },
        nombre_contacto: {
          type: DataTypes.STRING(40),
          unique: false
        },
        cargo_contacto: {
          type: DataTypes.STRING(100),
          unique: false
        },
        telefono_contacto: {
          type: DataTypes.STRING(15),
          unique: false
        },
        celular_contacto: {
          type: DataTypes.STRING(15),
          unique: false
        },
        email_contacto: {
          type: DataTypes.STRING(45),
          unique: false
        },
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Cliente;
  };
  