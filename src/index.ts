import express, { Request, Response } from 'express';
import { sequelize } from './models/database';
import './models/associations';
import veiculoRoutes from './routes/veiculoRoutes';
import clienteRoutes from './routes/clienteRoutes';
import locacaoRoutes from './routes/locacaoRoutes';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Isso está funcionando :)');
});

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`);
});

app.get('/database', (req: Request, res: Response) => {
    (async () => {
        try {
          await sequelize.sync({ force: true });
          console.log('Tabelas geradas com sucesso!');
          res.send('Tabelas geradas com sucesso!');
        } catch (error) {
          console.error('Erro ao gerar tabelas:', error);
          res.send('Erro ao gerar tabelas');
        }
      })();
});

app.use(express.json());
app.use('/veiculo', veiculoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/locacao', locacaoRoutes);