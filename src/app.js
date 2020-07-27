require('dotenv').config(); // Iniciando configuração do DOTENV

const cors = require('cors');
const express = require('express'); // Importando biblioteca EXPRESS
require('express-async-errors'); // Importando biblioteca EXPRESS-ASYNC-ERRORS
const morgan = require('morgan'); // Importando biblioteca MORGAN
const helmet = require('helmet'); // Importando o HELMET
const routes = require('./routes'); // Importando o ROUTES
const logger = require('./helper/logger'); // Importando o LOGGER

const app = express();

// Ensinando API a trabalhar com JSON - IMPORTANTE
app.use(express.json());

// Protegendo cabeçalho da API - IMPORTANTE
app.use(helmet());

// Liberando requisiççoes atraves de aplicações sem ser INSOMNIAS e POSTMAM - IMPORTANTE
app.use(cors());

// Morgan serve para  exibir o informações das requisições
app.use(morgan('dev'));

// Utilizando as Rotas que foram importadas - IMPORTANTE
app.use(routes);

// Apresentando qualquer ERROR da API - IMPORTANTE
app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).json({ error: 'Houve um erro na API' });
});

// Colocando online
app.listen(process.env.PORT || 3000, () =>
  logger.info(`API OK NA PORTA: ${process.env.PORT || 3000}`)
);
