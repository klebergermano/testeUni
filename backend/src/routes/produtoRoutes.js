import express from "express";
import ProdutoControler from '../controllers/ProdutoControler.js'


const router = express.Router();


router.get('/view', ProdutoControler.listarProdutos);
router.get('/buscar/:id', ProdutoControler.buscarProduto);
router.post('/add', ProdutoControler.AddProduto);
router.put('/update/:id', ProdutoControler.AtualizarProduto);
router.delete('/:id', ProdutoControler.DeletarProduto);

export default router; 
