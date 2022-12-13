import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json());

server.use(categoriesRoutes);

server.get('/status', (req, res) => {
    res.send('Funcionando!');
});

server.listen(process.env.PORT, () => {
    console.log(`Magic happens on port ${process.env.PORT}`);
});