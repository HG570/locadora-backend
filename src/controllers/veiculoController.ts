import {Request, Response} from 'express';
import Veiculo from "../models/Veiculo";
import {Sequelize, sequelize} from '../models/database';

export const adicionarVeiculo = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { marca, modelo, ano, preco, placa, disponibilidade } = req.body;
        await Veiculo.create({marca, modelo, ano, preco, placa, disponibilidade}, { transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Cadastrado com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Erro ao adicionar veiculo'});
    }
}

export const mostrarVeiculo =  async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            res.status(400).json({ error: 'Veiculo não encontrado'});
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o veiculo ${req.params.id}`})
    }
};

export const todosVeiculos = async (req: Request, res: Response) => {
    try {
        const { situation } = req.query;
        const condicao: any = {};
        if (situation === '0') {
            condicao.disponibilidade = false;
        } else if (situation === '1') {
            condicao.disponibilidade = true;
        }
        const veiculos = await Veiculo.findAll({
            where: { disponibilidade: condicao.disponibilidade},
        });
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os veiculos!'});
    }
};

export const editarVeiculo =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { marca, modelo, ano, placa, preco, disponibilidade } = req.body;
        await Veiculo.update(
            { marca, modelo, ano, placa, preco, disponibilidade },
            {
                where: { id_veiculo: req.params.id},
            }, { transaction }
        );
        await transaction.commit();
        res.status(200).json({ message: 'Veiculo editado com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao editar o veiculo ${req.params.id}`})
    }
};

export const deletarVeiculo =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        await Veiculo.destroy({
            where: {
                id_veiculo: req.params.id,
            },
        }, { transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Veiculo excluído com sucesso!'})
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao deletar o veiculo ${req.params.id}`})
    }
};

export const buscarMarcaVeiculo =  async (req: Request, res: Response) => {
    try {
        const { marca } = req.body;
        const veiculo = await Veiculo.findOne({
            where: {
                marca: marca,
            },
        });
        if (!veiculo) {
            res.status(400).json({ error: 'Veiculo não encontrado'});
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o veiculo ${req.params.id}`})
    }
};

export const buscarModeloVeiculo =  async (req: Request, res: Response) => {
    try {
        const { modelo } = req.body;
        const veiculo = await Veiculo.findOne({
            where: {
                modelo: modelo,
            },
        });
        if (!veiculo) {
            res.status(400).json({ error: 'Veiculo não encontrado'});
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o veiculo ${req.params.id}`})
    }
};

export const buscarPrecoVeiculo =  async (req: Request, res: Response) => {
    try {
        const { preco } = req.body;
        const veiculo = await Veiculo.findOne({
            where: {
                preco: preco,
            },
        });
        if (!veiculo) {
            res.status(400).json({ error: 'Veiculo não encontrado'});
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o veiculo ${req.params.id}`})
    }
};