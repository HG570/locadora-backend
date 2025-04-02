import Cliente from "./Cliente";
import Locacao from "./Locacao";
import Veiculo from "./Veiculo";


Locacao.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Locacao.belongsTo(Veiculo, { foreignKey: 'id_veiculo' });
Cliente.hasMany(Locacao, { foreignKey: 'id_cliente' });
Veiculo.hasMany(Locacao, { foreignKey: 'id_veiculo' });