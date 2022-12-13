import express from 'express';

const server = express();

server.get('/status', (req, res) => {
    res.send('Funcionando!');
});

server.listen(4000, () => {
    console.log('Magic happens on port 4000');
});