import express from "express";
import UserController from '../controllers/UserController.js'


const router = express.Router();


router.get('/view', UserController.ViewUsers);
router.get('/buscar/:id', UserController.BuscarUser);
router.post('/add', UserController.AddUser);
router.put('/update/:id', UserController.AtualizarUser);
router.delete('/:id', UserController.DeletarUser);

export default router; 
