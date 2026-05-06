const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

const pathFrontend = path.join(__dirname, '../../frontend');

// Middleware JSON
app.use(express.json());

// Arquivos estáticos (css, js, imagens)
app.use(express.static(pathFrontend));

// Rotas de API (se houver)
// app.get('/api/...', ...);

// Fallback SPA (SEMPRE por último)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(pathFrontend, 'index.html'));
});

// Start
app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));