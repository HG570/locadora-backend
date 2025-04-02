import express from 'express';
import { adicionarCliente, deletarCliente, editarCliente, mostrarCliente, todosClientes } from '../controllers/clienteController';

const router = express.Router();

router.post('/add', adicionarCliente);

router.get('/show/:id', mostrarCliente);

router.get('/all', todosClientes);

router.put('/update/:id', editarCliente);

router.delete('/delete/:id', deletarCliente);

export default router;