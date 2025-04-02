import { Sequelize, sequelize } from './database';
import Locacao from './Locacao';

const Veiculo = sequelize.define('veiculo', {
    id_veiculo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    marca: {
        type: Sequelize.STRING(32)
    },
    modelo: {
        type: Sequelize.STRING(32)
    },
    ano: {
        type: Sequelize.INTEGER(4)
    },
    preco: {
        type: Sequelize.DOUBLE
    },
    placa: {
        type: Sequelize.STRING(7)
    },
    disponibilidade: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {freezeTableName: true});

export default Veiculo;