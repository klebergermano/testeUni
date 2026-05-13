import express from 'express';
import path from 'path';
import db from './database/connection.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;


// recriando __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFrontend = path.join(__dirname, '../../frontend');

// Middleware JSON
app.use(express.json());

// Arquivos estáticos (css, js, imagens)
app.use(express.static(pathFrontend));

// Rotas de API (se houver)
// app.get('/api/...', ...);
// login

app.get('/produtos', async (req, res) => {


    try {

        const [rows] = await db.query(
            'SELECT * FROM produtos'
        );
        console.log(rows)
        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro no banco de dados'
        });

    }

});


// app.get('/login', (req, res) => {
//     res.sendFile(path.join(pathFrontend, '/Login.html'));
// });





//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

// // Fallback 
// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(pathFrontend, 'index.html'));
// });


// Start
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));