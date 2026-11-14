const { Sequelize } = require('sequelize');
const path = require('path');

// Инициализация Sequelize с SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.db'),
  logging: false // Отключить логирование SQL запросов
});

module.exports = sequelize;
