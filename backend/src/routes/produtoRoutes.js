import express from "express";
import { listarProdutos, criarProduto, buscarProduto, deletarProduto } from '../controllers/produtoControler.js'


const router = express.Router();


router.get('/view', listarProdutos);
router.get('/buscar:id', buscarProduto);
router.get('/criar', criarProduto);
router.get('/deletar:id', deletarProduto);

export default router; 
