import { Sequelize, sequelize } from './database';
import Cliente from './Cliente';
import Veiculo from './Veiculo';

const Locacao = sequelize.define('locacao', {
    id_locacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: Sequelize.DOUBLE
    },
    entrada: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    saida: {
        type: Sequelize.DATE
    }
}, {freezeTableName: true});
export default Locacao;