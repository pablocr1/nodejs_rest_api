const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto criado'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Detalhes do produto: ' + id
        });
    } else {
        res.status(200).send({
            mensagem: 'Detalhes do produto: ' + id
        });
    }
});


router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto atualizado'
    });
});


router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto excluido'
    });
});

module.exports = router;