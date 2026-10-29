const express = require("express")
const db = require("../db/connection")

const listarProdutos = (req, res) => {
    const pagina = parseInt(req.query.pagina) || 1
    const qtd = parseInt(req.query.qtd) || 10

    const paginaAtual = pagina < 1 ? 1 : pagina
    const limite = qtd < 1 ? 10 : qtd

    const offset = (paginaAtual - 1) * limite

    db.query('SELECT count(*) as total FROM produtos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const totalRegistros = results[0].total
        //O Math.ceil() é uma função nativa do JavaScript que arredonda um número sempre para cima para o número inteiro mais próximo.
        const totalPaginas = Math.ceil(totalRegistros / limite)

        const sql = "SELECT nome, preco FROM produtos LIMIT ? OFFSET ?"

        db.query(sql, [limite, offset], (err, produtos) => {
            if(err) return res.status(500).json({error: err.message})
            return res.json({
                paginacao: {
                    paginaAtual,
                    itensPorPagina: limite,
                    totalRegistros,
                    totalPaginas,
                    temProxima: paginaAtual < totalPaginas,
                    temAnterior: paginaAtual > 1
                },
                dados: produtos
            })
        })
  });
}
const buscarProdutoPorId = (req, res) => {
    const { id }   = req.params
    db.query("SELECT * FROM produtos WHERE id = ?", [id], (err, results) => {
        if(err) return res.status(500).json({error: err.message})
        if(results.length === 0) return res.status(404).json({message: "Produto não encontrado!"})
        return res.json(results[0])
    })
}

const criarProduto = (req, res) => {
    const { nome, preco } = req.body

    if(!nome || !preco){
        return res.status(400).json({ error: "Nome e preço são obrigatórios!"})
    }
    db.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)',  [nome, preco], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        return res.status(201).json({id: results.insertId, nome, preco})
    });
}

const atualizarProduto = (req, res) => {
    const { id } = req.params
    const {nome, preco} = req.body

    db.query('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if(results.affectedRows === 0) return res.status(404).json({message: "Produto não encontrado!"})
        return res.status(200).json({message: "Produto atualizado com sucesso!"})
    })
}
const deletarProduto =  (req, res) => {
    const { id } = req.params

    db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if(results.affectedRows === 0) return res.status(404).json({message: "Produto não encontrado!"})
        res.status(204).send("Excluído");
  });
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto,
};
    