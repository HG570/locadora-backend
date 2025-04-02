import {Request, Response} from 'express';
import Cliente from '../models/Cliente'
import {Sequelize, sequelize} from '../models/database';

export const adicionarCliente = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { nome, cpf, data_de_nascimento, telefone } = req.body;
        console.log(nome, cpf, data_de_nascimento, telefone)
        await Cliente.create({nome, cpf, data_de_nascimento, telefone}, { transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Cadastrado com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: 'Erro ao adicionar cliente'});
    }
}

export const mostrarCliente =  async (req: Request, res: Response) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            res.status(400).json({ error: 'Cliente não encontrado'});
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: `Erro ao encontrar o cliente ${req.params.id}`})
    }
};

export const todosClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar todos os clientes!'});
    }
};

export const editarCliente =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const {  nome, cpf, data_de_nascimento, telefone } = req.body;
        await Cliente.update(
            {  nome, cpf, data_de_nascimento, telefone },
            {
                where: { id_cliente: req.params.id},
            }, { transaction }
        );
        await transaction.commit();
        res.status(200).json({ message: 'Cliente editado com sucesso!'});
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao editar o cliente ${req.params.id}`})
    }
};

export const deletarCliente =  async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
        await Cliente.destroy({
            where: {
                id_cliente: req.params.id,
            },
        }, { transaction });
        await transaction.commit();
        res.status(200).json({ message: 'Cliente excluído com sucesso!'})
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao deletar o cliente ${req.params.id}`})
    }
};