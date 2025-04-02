import express from 'express';
import { adicionarLocacao, editarLocacao, mostrarLocacao, todasLocacoes, finalizarLocacao, todasLocacoesCliente} from '../controllers/locacaoController';

const router = express.Router();

router.post('/add', adicionarLocacao);

router.get('/show/:id', mostrarLocacao);

router.get('/all', todasLocacoes);

router.get('/cliente/all', todasLocacoesCliente);

router.get('/finish/:id', finalizarLocacao);

router.put('/update/:id', editarLocacao);

export default router;