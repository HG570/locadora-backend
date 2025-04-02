const Sequelize = require('sequelize');

export const sequelize = new Sequelize('rafaelPinheiroDB', 'userdb', 'admin@123', {
    host: "servermysqlcn1.mysql.database.azure.com",
    port: "3306",
    dialect: "mysql"
});

export { Sequelize };