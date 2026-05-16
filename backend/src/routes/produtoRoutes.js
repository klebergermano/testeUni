import express from "express";
import { listarProdutos, AddProduto, buscarProduto, DeletarProduto, AtualizarProduto } from '../controllers/produtoControler.js'


const router = express.Router();


router.get('/view', listarProdutos);
router.get('/buscar/:id', buscarProduto);
router.post('/add', AddProduto);
router.put('/update/:id', AtualizarProduto);
router.delete('/:id', DeletarProduto);

export default router; 
