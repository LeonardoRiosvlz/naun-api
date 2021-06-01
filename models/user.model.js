module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      }, 
      nombre: {
        type: DataTypes.STRING,
        unique: false
      },
      status: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        unique: false
      },
      tipo: {
        type: DataTypes.ENUM('Master','Cliente','Usuario'),
        unique: false
      },
      canal: {
        type: DataTypes.STRING(25),
        unique: false
      },   
      imagen: {
        type: DataTypes.STRING,
        unique: false
      },   
      email: {
        type: DataTypes.STRING
      },
      firma: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
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

  return User;
};
