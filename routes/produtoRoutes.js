const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/auth")

// Sem usar o verifyJWT para testar melhor o código e suas funcionalidades
const {listarProdutos, buscarProdutoPorId, criarProduto, atualizarProduto, deletarProduto } = require("../controllers/produtoController")
router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);  // GET /produtos/:id - Buscar um
router.post('/', criarProduto);        // POST /produtos - Criar
router.put('/:id', atualizarProduto);   // PUT /produtos/:id - Atualizar
router.delete('/:id', deletarProduto);  // DELETE /produtos/:id - Deletar


module.exports = router;