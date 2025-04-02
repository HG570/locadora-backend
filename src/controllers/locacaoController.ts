import {Request, Response} from 'express';
import Locacao from "../models/Locacao";
import { Op } from 'sequelize';
import {Sequelize, sequelize} from '../models/database';
import Veiculo from '../models/Veiculo';
import Cliente from '../models/Cliente';

export const adicionarLocacao = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { id_cliente, id_veiculo } = req.body;
        const cliente = await Cliente.findByPk(id_veiculo);
        const veiculo = await Veiculo.findOne({
            where: { id_veiculo: id_veiculo, disponibilidade: true }
        });
        
        if (!cliente) {
            await transaction.rollback();
            res.status(400).json({ error: 'Cliente não encontrado' });
        }
        if (!veiculo) {
            await transaction.rollback();
            res.status(400).json({ error: 'Veículo não encontrado ou indisponível' });
        }
        const valor = veiculo.preco/300;
        await Locacao.create({ valor, id_cliente, id_veiculo}, { transaction });
        await Veiculo.update(
            { disponibilidade: false },
            { where: { id_veiculo: id_veiculo }, transaction }
        );
        await transaction.commit();
        res.status(200).json({ message: 'Cadastrado com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Erro ao adicionar locação'});
    }
}

export const mostrarLocacao =  async (req: Request, res: Response) => {
    try {
        const locacao = await Locacao.findByPk(req.params.id);
        if (!locacao) {
            res.status(200).json({message: 'Locação não encontrada'});
        }
        res.status(200).json(locacao);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o locação ${req.params.id}`})
    }
};

export const todasLocacoes = async (req: Request, res: Response) => {
    try {
        const { situation } = req.query;
        const condicao: any = {};
        if (situation === '0') {
            condicao.saida = null;
        } else if (situation === '1') {
            condicao.saida = { [Op.ne]: null };
        }
        const locacoes = await Locacao.findAll({
            where: condicao,
        });
        res.status(200).json(locacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os locações!'});
    }
};

export const editarLocacao =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { id_cliente, id_veiculo } = req.body;
        const [locacao, cliente, novoVeiculo] = await Promise.all([
            Locacao.findOne({
                where: { id_locacao: req.params.id }
            }),
            Cliente.findByPk(id_cliente),
            Veiculo.findOne({
            where: { id_veiculo: id_veiculo, disponibilidade: true }
            })
        ])
        if (!cliente) {
            await transaction.rollback();
            res.status(400).json({ error: 'Cliente não encontrado' });
        }
        if (locacao.id_veiculo !== id_veiculo && !novoVeiculo) {
            await transaction.rollback();
            res.status(400).json({ error: 'Veículo não encontrado ou indisponível' });
        }
        if(locacao.id_veiculo !== id_veiculo){
            await Veiculo.update(
                { disponibilidade: true },
                { where: { id_veiculo: locacao.id_veiculo }, transaction }
            );
            await novoVeiculo.update(
                { disponibilidade: false },
                { transaction }
            );
        }
        
        const valor = locacao.id_veiculo !== id_veiculo ? novoVeiculo.preco/300 : Locacao.valor 
        await Locacao.update(
            { valor, id_cliente, id_veiculo },
            {where: { id_locacao: req.params.id}, transaction }
        );
        await transaction.commit();
        res.status(200).json({ message: 'Locação editada com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        
        console.log(error);
        res.status(500).json({ error: `Erro ao editar locação ${req.params.id}`})
    }
};

export const finalizarLocacao =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const locacao = await Locacao.findByPk(req.params.id);
        await Veiculo.update(
            { disponibilidade: true },
            { where: { id_veiculo: locacao.id_veiculo }, transaction }
        );
        const saida =  new Date();
        await Locacao.update(
            { saida },
            {
                where: { id_locacao: req.params.id},
            }, { transaction }
        );
        await transaction.commit();
        res.status(200).json({ message: 'Locação editada com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao editar locação ${req.params.id}`})
    }
};

export const todasLocacoesCliente = async (req: Request, res: Response) => {
    try {
        const { id_cliente } = req.body;
        const { situation } = req.query;
        const condicao: any = {};
        if (situation === '0') {
            condicao.saida = null;
        } else if (situation === '1') {
            condicao.saida = { [Op.ne]: null };
        }
        const locacoes = await Locacao.findAll({
            where: { saida: condicao.saida, id_cliente: id_cliente},
        });
        res.status(200).json(locacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os locações!'});
    }
};