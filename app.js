const porta = 3000;
const express = require('./config/express');
const app = express();

app.listen(porta, () => console.log(`API Filmes @ porta ${porta}`));

module.exports = app;