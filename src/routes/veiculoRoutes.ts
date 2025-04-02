import express from 'express';
import { adicionarVeiculo, buscarMarcaVeiculo, buscarModeloVeiculo, buscarPrecoVeiculo, deletarVeiculo, editarVeiculo, mostrarVeiculo, todosVeiculos } from '../controllers/veiculoController';

const router = express.Router();

router.post('/add', adicionarVeiculo);

router.get('/show/:id', mostrarVeiculo);

router.get('/all', todosVeiculos);

router.put('/update/:id', editarVeiculo);

router.delete('/delete/:id', deletarVeiculo);

router.get('/marca', buscarMarcaVeiculo);

router.get('/modelo', buscarModeloVeiculo);

router.get('/preco', buscarPrecoVeiculo);

export default router;