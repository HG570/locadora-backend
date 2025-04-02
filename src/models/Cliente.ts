import { Sequelize, sequelize } from './database';
import Locacao from './Locacao';

const Cliente = sequelize.define('cliente', {
    id_cliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(128)
    },
    cpf: {
        type: Sequelize.STRING(11)
    },
    data_de_nascimento: {
        type: Sequelize.DATEONLY
    },
    telefone: {
        type: Sequelize.STRING(11)
    }
}, {freezeTableName: true});

export default Cliente;