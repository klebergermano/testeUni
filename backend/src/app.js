import express from 'express';
const app = express();

import path from 'path';
import { fileURLToPath } from 'url';
import produtoRoutes from './routes/produtoRoutes.js';




// recriando __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFrontend = path.join(__dirname, '../../frontend');

// Middleware JSON
app.use(express.json());

// Arquivos estáticos (css, js, imagens)
app.use(express.static(pathFrontend));

//Routes
app.use('/produtos', produtoRoutes);
//app.use('/usuarios', usuarioRoutes);



export default app