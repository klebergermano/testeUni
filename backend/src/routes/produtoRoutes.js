import express from "express";
import { listarProdutos, AddProduto, buscarProduto, DeletarProduto } from '../controllers/produtoControler.js'


const router = express.Router();


router.get('/view', listarProdutos);
router.get('/buscar/:id', buscarProduto);
router.post('/add', AddProduto);
router.delete('/:id', DeletarProduto);

export default router; 
