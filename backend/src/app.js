import express from 'express';
const app = express();
import cors from 'cors';



import path from 'path';
import { fileURLToPath } from 'url';
import UserRoutes from './routes/UserRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import LoginRoutes from "./routes/LoginRoutes.js";




// recriando __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathFrontend = path.join(__dirname, '../../frontend');


app.use(cors());

// Middleware JSON
app.use(express.json());

// Arquivos estáticos (css, js, imagens)
app.use(express.static(pathFrontend));

//Routes
app.use("/login", LoginRoutes);
app.use('/produtos', produtoRoutes);
app.use('/users', UserRoutes);




export default app