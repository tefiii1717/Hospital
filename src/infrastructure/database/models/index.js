'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

// Importar todos los modelos
const Paciente       = require('./paciente')(sequelize, DataTypes);
const Medico         = require('./medico')(sequelize, DataTypes);
const Cama           = require('./cama')(sequelize, DataTypes);
const Ingreso        = require('./ingreso')(sequelize, DataTypes);
const HistoriaClinica = require('./historiaclinica')(sequelize, DataTypes);
const NotaMedica     = require('./notamedica')(sequelize, DataTypes);
const Cita           = require('./cita')(sequelize, DataTypes);
const Receta         = require('./receta')(sequelize, DataTypes);
const Alta           = require('./alta')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  Paciente,
  Medico,
  Cama,
  Ingreso,
  HistoriaClinica,
  NotaMedica,
  Cita,
  Receta,
  Alta,
};

// Ejecutar asociaciones si los modelos las definen
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;