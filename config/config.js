module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  
  /** DATABASE */
//  db: {
//    DB_HOST: "localhost",
//    DB_USER: "root",
//    DB_PASS: "",
//    DB_NAME: "naun",
//    dialect: "mysql",
//
//    // pool is optional, it will be used for Sequelize connection pool configuration
//    pool: {
//      max: 5,
//      min: 0,
//      acquire: 30000,
//      idle: 10000
//    }
//  },
 
    /** DATABASE */
  db: {
    DB_HOST: "b2udssy2e3uqzaousqi3-mysql.services.clever-cloud.com",
    DB_USER: "ungi8bvczfvmsllc",
    DB_PASS: "vupd8uStfDup1ViZeGZF",
    DB_NAME: "b2udssy2e3uqzaousqi3",
    dialect: "mysql",
  
    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  /** AUTH KEY */
  auth: {
    secret: "our-secret-key"
  }
};

