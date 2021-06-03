const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}
                res.status(200).send({
                    response: resultado
                });
            }
        )
    });
});

router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Produto criado com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE produtos.id = ?',
            [id],
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({error: error})}
                res.status(200).send({
                    response: resultado
                });
            }
        )
    });
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