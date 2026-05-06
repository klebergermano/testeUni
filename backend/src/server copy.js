const express = require('express');
const app = express();

const PORT = 5000;

// Middleware (optional)
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send('Server running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
